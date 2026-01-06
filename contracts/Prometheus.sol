pragma solidity ^0.8.3;

contract Notary {
    constructor() {
        new Oracle(address(this));
    }
    struct Image {
        uint cid;
        uint32 genesisFunding;
        uint32 commitEnd;
        uint32 revealEnd;
    }

    event ImageStored(uint hash, uint cid, uint32 genesisFunding);

    mapping(uint jpegHash => Image) private retrieval;

    function store_image(uint _jpegHash, uint _cid, uint32 _genesisFunding, uint32 _commitEnd, uint32 _revealEnd) external payable {
        if (_commitEnd > 0) {
            require(msg.value == _genesisFunding, "Transaction value does not match provided genesis funding.");
            require(_commitEnd - block.timestamp >= 10 minutes, "Length of commitment period must be at least 10 minutes");
            require(_revealEnd - _commitEnd >= 10 minutes, "Length of commitment period must be at least 10 minutes");
        }
        else if (_genesisFunding > 0) {
            revert("Non-balloting transaction can not have genesis funding.");
        }
        require(retrieval[_jpegHash].cid == 0, "Image already notarized.");
        retrieval[_jpegHash].cid = _cid;
        retrieval[_jpegHash].genesisFunding = _genesisFunding;
        retrieval[_jpegHash].commitEnd = _commitEnd;
        retrieval[_jpegHash].revealEnd = _revealEnd;
    }
    function retrieve_image(uint _jpegHash) external view returns (uint) {
        require(retrieval[_jpegHash].cid != 0, "Provided hash not recorded in notary.");
        return retrieval[_jpegHash].cid;
    }
}

contract Oracle {
    address notary;
    SecurityPool securityPool;
    constructor (address _notary) {
        notary = _notary;
        securityPool = new SecurityPool(address(this));
    }
    struct Vote {
        uint32 authenticityRating;
        uint stake;
        uint share;
    }
    struct AuthenticityBallot {
        uint32 authenticityRating;
        uint stake;
        uint32 commitEnd;
        uint32 revealEnd;
        mapping(uint => bool) commitments;
        mapping(address => Vote) votes;
        uint shares;
        uint32 ratingsCount;
        bool exists;
    }
    mapping(uint => AuthenticityBallot) private ballots;
    function add_ballot(uint _genesisFunding, uint jpeg_hash, uint32 _commitEnd, uint32 _revealEnd) external payable {
        require(msg.sender == notary, "Only the notary contract can add a ballot.");
        require(jpeg_hash != 0, "Invalid hash.");
        require(ballots[jpeg_hash].exists == false, "Balloting has already begun.");
        require(_commitEnd - block.timestamp >= 10 minutes, "Length of commitment period must be at least 10 minutes.");
        require(_revealEnd - _commitEnd >= 10 minutes, "Length of commitment period must be at least 10 minutes.");
        ballots[jpeg_hash].authenticityRating = 0;
        ballots[jpeg_hash].stake = _genesisFunding;
        ballots[jpeg_hash].commitEnd = _commitEnd;
        ballots[jpeg_hash].revealEnd = _revealEnd;
        ballots[jpeg_hash].exists = true;
    }
    function commit_vote(uint voteCommitment, uint jpegHash) external {
        require(ballots[jpegHash].exists, "Ballot does not exist");
        require(block.timestamp < ballots[jpegHash].commitEnd, "Commitment period has ended.");
        ballots[jpegHash].commitments[voteCommitment] = true;
    }
    function reveal_vote(uint jpegHash, uint voteCommitment, uint32 revealRating, uint revealStake, uint spentReceipt) external {
        require(ballots[jpegHash].exists, "Ballot does not exist");
        require(ballots[jpegHash].commitments[voteCommitment], "Vote does not exist");
        require(block.timestamp > ballots[jpegHash].commitEnd, "Commitment period has not ended.");
        require(block.timestamp < ballots[jpegHash].revealEnd, "Reveal period has ended.");
        require(sha256(abi.encodePacked(revealRating + revealStake + spentReceipt)) == bytes32(voteCommitment), "Revealed data does not hash to commitment.");
        require(securityPool.get_balance(spentReceipt) >= revealStake, "Security receipt balance too low.");
        require(securityPool.check_ownership(spentReceipt, msg.sender), "Revealer is not valid spender of security receipt.");

        uint32 rating = ballots[jpegHash].authenticityRating;
        uint32 count = ballots[jpegHash].ratingsCount;
        ballots[jpegHash].authenticityRating = rating * (count / (++count)) + revealRating/count;
        ballots[jpegHash].ratingsCount = count;

        Vote storage revealed = ballots[jpegHash].votes[msg.sender];
        revealed.stake = revealStake;
        revealed.authenticityRating = revealRating;

        ballots[jpegHash].stake += revealStake;
    }   
    function secure_reward(uint jpegHash) external {
        require(ballots[jpegHash].exists, "Ballot does not exist");
        require(ballots[jpegHash].votes[msg.sender].stake > 0, "Sender's vote does not exist");
        require(block.timestamp > ballots[jpegHash].revealEnd, "Reveal period has not ended.");

        int32 imageRating = int32(ballots[jpegHash].authenticityRating);
        int32 voterRating = int32(ballots[jpegHash].votes[msg.sender].authenticityRating);
        uint stake = ballots[jpegHash].votes[msg.sender].stake;
        uint share = (1/(abs(imageRating - voterRating))) * stake;

        ballots[jpegHash].votes[msg.sender].share = share;
        ballots[jpegHash].shares += share;
    }
    function withdraw(uint jpegHash) external {
        require(ballots[jpegHash].exists, "Ballot does not exist");
        require(ballots[jpegHash].votes[msg.sender].stake > 0, "Sender's vote does not exist");
        require(block.timestamp > ballots[jpegHash].revealEnd + 1 days, "Secure period has not ended.");
        securityPool.withdraw((ballots[jpegHash].votes[msg.sender].share / ballots[jpegHash].shares) * ballots[jpegHash].stake, payable(msg.sender));
    }
    function abs(int32 x) public pure returns (uint32) {
        return x >= 0 ? uint32(x) : uint32(-x);
    }
}
contract SecurityPool {
    address oracle;
    constructor (address _oracle) {
        oracle = _oracle;
    }
    uint totalBalance;
    mapping(uint => uint) private receipts;
    mapping(uint => address) private ownership;
    function deposit(uint hashLocker) external payable {
        totalBalance += msg.value;
        if (receipts[hashLocker] == 0) {
            ownership[hashLocker] = msg.sender;
        }
        receipts[hashLocker] += msg.value;
    }
    function get_balance(uint hashLocker) external view returns (uint) {
        return receipts[hashLocker];
    }
    function check_ownership(uint hashLocker, address check) external view returns (bool) {
        return ownership[hashLocker] == check;
    }
    function withdraw(uint amount, address payable to) external {
        require(msg.sender == oracle, "Message sender must be oracle contract.");
        to.transfer(amount);
    }
}