import {PrimaryColumn, Column} from "../../../src/decorator/columns";
import {Table} from "../../../src/decorator/tables";
import {PostDetails} from "./PostDetails";
import {ManyToMany} from "../../../src/decorator/relations";
import {PostCategory} from "./PostCategory";
import {PostAuthor} from "./PostAuthor";
import {PostInformation} from "./PostInformation";
import {PostImage} from "./PostImage";
import {PostMetadata} from "./PostMetadata";

@Table("sample4_post")
export class Post {

    @PrimaryColumn("int", { autoIncrement: true })
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    // post has relation with category, however inverse relation is not set (category does not have relation with post set)
    @ManyToMany(type => PostCategory, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    categories: PostCategory[] = [];

    // post has relation with details. cascade inserts here means if new PostDetails instance will be set to this 
    // relation it will be inserted automatically to the db when you save this Post entity
    @ManyToMany(type => PostDetails, details => details.posts, {
        cascadeInsert: true
    })
    details: PostDetails[] = [];

    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    @ManyToMany(type => PostImage, image => image.posts, {
        cascadeUpdate: true
    })
    images: PostImage[] = [];

    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    @ManyToMany(type => PostMetadata, metadata => metadata.posts, {
        cascadeRemove: true
    })
    metadatas: PostMetadata[] = [];

    // post has relation with details. full cascades here
    @ManyToMany(type => PostInformation, information => information.posts, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    informations: PostInformation[] = [];

    // post has relation with details. not cascades here. means cannot be persisted, updated or removed
    @ManyToMany(type => PostAuthor, author => author.posts)
    authors: PostAuthor[] = [];

}