
import { Category } from "./Category.entity";
import { Marker } from "./Marker.entity";
import { User } from "./user.entity";

export class Event {
    // id?: string;
    eventTitle?: string;
    // ?: string;
    city?: string;
    // address?: string = "";
    hourBegin?: Date;
    hourEnd?: Date;
    createdAt?: Date;
    description?: string;
    // userLikes?: User[] = [];
    // userDislikes?: User[] = [];
    // usersParticipating?: User[] = [];
    category?: Category;
    // marker?: Marker;
    // comments?: Comment[] = [];
    isAlive: boolean = true;

    author?: User;
}
