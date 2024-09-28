// #####################
// ## Types
// #####################
export type Address = `0x${string}`;

// #####################
// ## Enums
// #####################

export type AdProposalStatus =
    | "CURRENT_ACCEPTED"
    | "CURRENT_PENDING"
    | "CURRENT_REJECTED"
    | "PREV_ACCEPTED"
    | "PREV_PENDING"
    | "PREV_REJECTED";

export type FeeMethodology = "ADDED_TO_AMOUNT" | "CUT_TO_AMOUNT";

export type ListingType = "Direct" | "Auction";

export type Status = "UNSET" | "CREATED" | "COMPLETED" | "CANCELLED";

export type TokenType = "ERC1155" | "ERC721" | "ERC20";

export type TransferType = "Rent" | "Sale";

// #####################
// ## Entities
// #####################

export type AdOffer = {
    id: string;
    origin: Address;
    disable: boolean;
    name: string;
    metadataURL: string;
    nftContract: NftContract;
    initialCreator: Address;
    creationTimestamp: bigint;
    admins: Address[];
    validators: Address[];
    adParameters: AdOfferParameterLink[];
    allProposals: AdProposal[];
    currentProposals: CurrentProposal[];
};

export type AdOfferParameterLink = {
    id: string;
    enable: boolean;
    adOffer: AdOffer;
    adParameter: AdParameter;
};

export type AdParameter = {
    id: string;
    base: string;
    variants: string[];
    adOffers: AdOfferParameterLink[];
    proposals: AdProposal[];
    currentProposals: CurrentProposal[];
};

export type AdProposal = {
    id: string;
    adOffer: AdOffer;
    token: Token;
    adParameter: AdParameter;
    status: AdProposalStatus;
    data: string;
    rejectReason?: string;
    creationTimestamp: bigint;
    lastUpdateTimestamp: bigint;
};

export type CurrentProposal = {
    id: string;
    adOffer: AdOffer;
    token: Token;
    adParameter: AdParameter;
    pendingProposal: AdProposal;
    acceptedProposal: AdProposal;
    rejectedProposal: AdProposal;
};

export type EpochCurrencyRevenue = {
    id: string;
    year: number;
    month: number;
    currency: Address;
    totalAmount: bigint;
    callsWithProtocolFee: CallWithProtocolFee[];
};

export type FeeParamsForContract = {
    id: Address;
    feeRecipient: Address;
    feeBps: bigint;
    lastUpdateTimestamp: bigint;
};

export type NftContract = {
    id: Address;
    name?: string;
    symbol?: string;
    baseURI?: string;
    contractURI?: string;
    maxSupply?: bigint;
    minter?: Address;
    forwarder?: Address;
    owner?: OwnershipTransferred;
    royalty?: RoyaltiesSet;
    allowList: boolean;
    adOffers: AdOffer[];
    prices: NftPrice[];
    tokens: Token[];
};

export type NftPrice = {
    id: string;
    currency: Address;
    amount: bigint;
    enabled: boolean;
    nftContract: NftContract;
};

export type MarketplaceBid = {
    id: string;
    listing: MarketplaceListing;
    bidder: Address;
    quantity: bigint;
    newPricePerToken: bigint;
    totalBidAmount: bigint;
    paidBidAmount: bigint;
    refundBonus: bigint;
    refundProfit: bigint;
    currency: Address;
    status: Status;
    creationTxHash: Address;
    revenueTransaction?: RevenueTransaction;
    creationTimestamp: bigint;
    lastUpdateTimestamp: bigint;
    feeMethodology?: FeeMethodology;
    amountSentToProtocol?: bigint;
    protocolRecipient?: Address;
    amountSentToSeller?: bigint;
    sellerRecipient?: Address;
    amountSentToCreator?: bigint;
    creatorRecipient?: Address;
};

export type MarketplaceDirectBuy = {
    id: Address;
    listing: MarketplaceListing;
    buyer: Address;
    quantityBought: bigint;
    totalPricePaid: bigint;
    revenueTransaction: RevenueTransaction;
    feeMethodology?: FeeMethodology;
    amountSentToProtocol: bigint;
    protocolRecipient: Address;
    amountSentToSeller: bigint;
    sellerRecipient: Address;
    amountSentToCreator: bigint;
    creatorRecipient: Address;
};

export type MarketplaceListing = {
    id: string;
    origin: Address;
    listingType: ListingType;
    lister: Address;
    token: Token;
    startTime: bigint;
    endTime: bigint;
    quantity: bigint;
    currency: Address;
    reservePricePerToken: bigint;
    buyoutPricePerToken: bigint;
    tokenType: TokenType;
    transferType: TransferType;
    rentalExpirationTimestamp: bigint;
    status: Status;
    creationTimestamp: bigint;
    lastUpdateTimestamp: bigint;
    completedBid: MarketplaceBid;
    bids: MarketplaceBid[];
    directBuys: MarketplaceDirectBuy[];
};

export type MarketplaceOffer = {
    id: string;
    origin: Address;
    offeror: Address;
    token: Token;
    quantity: bigint;
    currency: Address;
    totalprice: bigint;
    tokenType: TokenType;
    transferType: TransferType;
    expirationTimestamp: bigint;
    rentalExpirationTimestamp: bigint;
    status: Status;
    revenueTransaction?: RevenueTransaction;
    referralAdditionalInformation?: string;
    creationTimestamp: bigint;
    lastUpdateTimestamp?: bigint;
    feeMethodology?: FeeMethodology;
    amountSentToProtocol?: bigint;
    protocolRecipient?: Address;
    amountSentToSeller?: bigint;
    sellerRecipient?: Address;
    amountSentToCreator?: bigint;
    creatorRecipient: Address;
};

export type RevenueTransaction = {
    id: Address;
    blockTimestamp: bigint;
    protocolFees: CallWithProtocolFee[];
    marketplaceBids: MarketplaceBid[];
    marketplaceDirectBuys: MarketplaceDirectBuy[];
    marketplaceOffers: MarketplaceOffer[];
    mints: Mint[];
};

export type Token = {
    id: string;
    nftContract: NftContract;
    tokenId: bigint;
    setInAllowList: boolean;
    mint: Mint;
};

export type TokenPrice = {
    id: string;
    currency: Address;
    amount: bigint;
    enabled: boolean;
    token: Token;
};

// #####################
// ## Metadata
// #####################

export type AdOfferMetadata = {
    id: string;
    offer: AdOffer;
    name?: string;
    description?: string;
    image?: string;
    terms?: string;
    externalURL?: string;
    validFrom?: bigint;
    validTo?: bigint;
    categories?: string[];
    creatorMetadata?: CreatorMetadata;
    tokenMetadata?: TokenMetadata;
};

export type CreatorMetadata = {
    id: Address;
    name?: string;
    description?: string;
    imageURL?: string;
    externalURL?: string;
    categories?: string[];
    adOffers: AdOfferMetadata[];
};

export type TokenMetadata = {
    id: string;
    name?: string;
    description?: string;
    imageURL?: string;
    externalURL?: string;
    attributes?: TokenMetadataAttributes[];
};

export type TokenMetadataAttributes = {
    id: string;
    traitType?: string;
    value?: string;
};

// ################################
// ## Common: ProtocoFee + Ownable
// #################################

export type CallWithProtocolFee = {
    id: Address;
    target: Address;
    currency: Address;
    fee: bigint;
    enabler: Address;
    spender: Address;
    referralAdditionalInformation: string;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
    revenueTransaction?: RevenueTransaction;
    referralAddresses: Address[];
    referralUnitShare?: number;
    referralNb?: number;
    epochCurrencyRevenue: EpochCurrencyRevenue;
};

export type FeeUpdate = {
    id: Address;
    feeRecipient: Address;
    feeBps: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type OwnershipTransferred = {
    id: Address;
    previousOwner: Address;
    newOwner: Address;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

// #####################
// ## DSponsorAdmin
// #####################

export type UpdateAdProposal = {
    id: string;
    offerId: bigint;
    tokenId: bigint;
    proposalId: bigint;
    adParameter: string;
    data: string;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateAdValidation = {
    id: string;
    offerId: bigint;
    tokenId: bigint;
    proposalId: bigint;
    adParameter: string;
    validated: boolean;
    reason: string;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateOffer = {
    id: string;
    offerId: bigint;
    disable: boolean;
    name: string;
    offerMetadata: string;
    nftContract: Address;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateOfferAdParameter = {
    id: string;
    offerId: bigint;
    adParameter: string;
    enable: boolean;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateOfferAdmin = {
    id: string;
    offerId: bigint;
    admin: Address;
    enable: boolean;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateOfferValidator = {
    id: string;
    offerId: bigint;
    validator: Address;
    enable: boolean;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

// #####################
// ## DSponsorNFTFactory
// #####################

export type NewDSponsorNFT = {
    id: string;
    contractAddr: Address;
    owner: Address;
    name: string;
    symbol: string;
    baseURI: string;
    contractURI: string;
    maxSupply: bigint;
    minter: Address;
    forwarder: Address;
    royaltyBps: bigint;
    currencies: Address[];
    prices: bigint[];
    allowedTokenIds: bigint[];
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

// #####################
// ## DSponsorNFT
// #####################

export type Approval = {
    id: string;
    owner: Address;
    approved: Address;
    tokenId: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type ApprovalForAll = {
    id: string;
    owner: Address;
    operator: Address;
    approved: boolean;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type ContractURIUpdated = {
    id: string;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type Initialized = {
    id: Address;
    version: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type Mint = {
    id: string;
    contractAddress: Address;
    tokenId: bigint;
    from: Address;
    to: Address;
    currency: Address;
    amount: bigint;
    tokenData: string;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
    revenueTransaction?: RevenueTransaction;
    token?: Token;
    feeMethodology?: FeeMethodology;
    amountSentToProtocol?: bigint;
    protocolRecipient?: Address;
    totalPaid?: bigint;
};

export type RoyaltiesSet = {
    id: Address;
    receiver: Address;
    bps: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type TokensAllowlist = {
    id: Address;
    allowed: boolean;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type TokensAllowlistUpdated = {
    id: Address;
    tokenId: bigint;
    allowed: boolean;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type Transfer = {
    id: Address;
    nftContractAddress: Address;
    from: Address;
    to: Address;
    tokenId: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateDefaultMintPrice = {
    id: Address;
    currency: Address;
    enabled: boolean;
    amount: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateMintPrice = {
    id: Address;
    tokenId: bigint;
    currency: Address;
    enabled: boolean;
    amount: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type UpdateUser = {
    id: Address;
    tokenId: bigint;
    user: Address;
    expires: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

// #####################
// ## DSponsorMarketplace
// #####################

export type AcceptedOffer = {
    id: string;
    offeror: Address;
    offerId: bigint;
    assetContract: Address;
    tokenId: bigint;
    seller: Address;
    quantityBought: bigint;
    totalPricePaid: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type AuctionClosed = {
    id: string;
    listingId: bigint;
    closer: Address;
    cancelled: boolean;
    auctionCreator: Address;
    winningBidder: Address;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type CancelledOffer = {
    id: string;
    offeror: Address;
    offerId: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type ListingAdded = {
    id: string;
    listingId: bigint;
    assetContract: Address;
    lister: Address;
    listing_listingId: bigint;
    listing_tokenOwner: Address;
    listing_assetContract: Address;
    listing_tokenId: bigint;
    listing_startTime: bigint;
    listing_endTime: bigint;
    listing_quantity: bigint;
    listing_currency: Address;
    listing_reservePricePerToken: bigint;
    listing_buyoutPricePerToken: bigint;
    listing_tokenType: number;
    listing_transferType: number;
    listing_rentalExpirationTimestamp: bigint;
    listing_listingType: number;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type ListingRemoved = {
    id: string;
    listingId: bigint;
    listingCreator: Address;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type ListingUpdated = {
    id: string;
    listingId: bigint;
    listingCreator: Address;
    quantityToList: bigint;
    reservePricePerToken: bigint;
    buyoutPricePerToken: bigint;
    currencyToAccept: Address;
    startTime: bigint;
    secondsUntilEndTime: bigint;
    rentalExpirationTimestamp: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};

export type NewBid = {
    id: string;
    listingId: bigint;
    quantityWanted: bigint;
    newBidder: Address;
    newPricePerToken: bigint;
    previousBidder: Address;
    refundBonus: bigint;
    currency: Address;
    newEndTime: bigint;
    blockNumber: bigint;
    blockTimestamp: bigint;
    transactionHash: Address;
};
