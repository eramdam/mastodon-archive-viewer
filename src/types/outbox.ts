// Generated with https://app.quicktype.io/

export interface Outbox {
  "@context": Array<ContextClass | string>;
  id: string;
  type: string;
  totalItems: number;
  orderedItems: OrderedItem[];
}

export interface ContextClass {
  litepub: string;
  directMessage: string;
  manuallyApprovesFollowers: string;
  sensitive: string;
  Hashtag: string;
  movedTo: AlsoKnownAs;
  alsoKnownAs: AlsoKnownAs;
  toot: string;
  Emoji: string;
  featured: AlsoKnownAs;
  featuredTags: AlsoKnownAs;
  schema: string;
  PropertyValue: string;
  value: string;
  ostatus: string;
  atomUri: string;
  inReplyToAtomUri: string;
  conversation: string;
  focalPoint: FocalPoint;
  blurhash: string;
  discoverable: string;
  indexable: string;
  memorial: string;
  votersCount: string;
  Device: string;
  Ed25519Signature: string;
  Ed25519Key: string;
  Curve25519Key: string;
  EncryptedMessage: string;
  publicKeyBase64: string;
  deviceId: string;
  claim: AlsoKnownAs;
  fingerprintKey: AlsoKnownAs;
  identityKey: AlsoKnownAs;
  devices: AlsoKnownAs;
  messageFranking: string;
  messageType: string;
  cipherText: string;
  suspended: string;
}

export interface AlsoKnownAs {
  "@id": string;
  "@type": string;
}

export interface FocalPoint {
  "@container": string;
  "@id": string;
}

export interface OrderedItem {
  id: string;
  type: OrderedItemType;
  actor: string;
  published: string;
  to: string[];
  cc: string[];
  object: ObjectClass | string;
}

export interface ObjectClass {
  id: string;
  type: OneOfType;
  summary: null | string;
  inReplyTo: null | string;
  published: string;
  url: string;
  attributedTo: string;
  to: string[];
  cc: string[];
  sensitive: boolean;
  atomUri: string;
  inReplyToAtomUri: null | string;
  conversation: string;
  content: string;
  contentMap?: ContentMap;
  attachment: Attachment[];
  tag: Tag[];
  replies: ObjectReplies;
  directMessage?: boolean;
  endTime?: string;
  closed?: string;
  votersCount?: number;
  oneOf?: OneOf[];
  updated?: string;
}

export interface Attachment {
  type: AttachmentType;
  mediaType: MediaType;
  url: string;
  name: null | string;
  blurhash: null | string;
  width: number;
  height: number;
  focalPoint?: number[];
}

export enum MediaType {
  ImageJPEG = "image/jpeg",
  ImagePNG = "image/png",
  VideoMp4 = "video/mp4",
  VideoQuicktime = "video/quicktime",
}

export enum AttachmentType {
  Document = "Document",
}

export interface ContentMap {
  en?: string;
  nl?: string;
  fr?: string;
  lt?: string;
  ht?: string;
  sr?: string;
  gd?: string;
  ca?: string;
  mt?: string;
  sn?: string;
  no?: string;
  so?: string;
  vi?: string;
  tr?: string;
  de?: string;
  fi?: string;
  sl?: string;
  pl?: string;
  co?: string;
  jv?: string;
  fy?: string;
  pt?: string;
  ig?: string;
  ja?: string;
  la?: string;
  st?: string;
  da?: string;
  sv?: string;
  ga?: string;
  su?: string;
  bg?: string;
  cy?: string;
  af?: string;
  mg?: string;
  lb?: string;
  et?: string;
  zu?: string;
  gl?: string;
  hi?: string;
  el?: string;
  ru?: string;
  mi?: string;
  eo?: string;
  es?: string;
  nb?: string;
}

export interface OneOf {
  type: OneOfType;
  name: string;
  replies: OneOfReplies;
}

export interface OneOfReplies {
  type: RepliesType;
  totalItems: number;
}

export enum RepliesType {
  Collection = "Collection",
}

export enum OneOfType {
  Note = "Note",
  Question = "Question",
}

export interface ObjectReplies {
  id: string;
  type: RepliesType;
  first: First;
}

export interface First {
  type: FirstType;
  next: string;
  partOf: string;
  items: Array<null | string>;
}

export enum FirstType {
  CollectionPage = "CollectionPage",
}

export interface Tag {
  type: TagType;
  href?: string;
  name: string;
  id?: string;
  updated?: string;
  icon?: Icon;
}

export interface Icon {
  type: IconType;
  mediaType: MediaType;
  url: string;
}

export enum IconType {
  Image = "Image",
}

export enum TagType {
  Emoji = "Emoji",
  Hashtag = "Hashtag",
  Mention = "Mention",
}

export enum OrderedItemType {
  Announce = "Announce",
  Create = "Create",
}
