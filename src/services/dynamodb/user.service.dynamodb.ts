import { BasicUser, UserAuth, UserDetails } from "../../types/User";
import {User as IUserService} from "../user.service";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "./ddbClient";
import {injectable} from "inversify"

@injectable()
export class User implements IUserService{
    public createUser = (user: UserAuth) => {
        return ddbClient.send(new PutItemCommand({
            TableName: "users",
            Item: {
              username: { S: user.username },
              email: { S: user.email},
              password: { S: user.password}
            },
        }))
        .then(() => {
            return true;
        }).catch(() => {
            return false;
        });
    }

    public getUserDetails = (username: BasicUser["username"]) => {
        return ddbClient.send(new GetItemCommand({
            TableName: "users",
            Key: {
                username: { S: username },
            },
        })).then(res => {
            if(res.Item){
                const fetchedUserDetails: UserDetails = {
                    username: res.Item.username.S!,
                    email: res.Item.email.S!,
                    firstName: res.Item.firstName ? res.Item.firstName.S! : "",
                    lastName: res.Item.firstName ? res.Item.lastName.S! : "",
                    profilePicture: res.Item.firstName ? res.Item.profilePicture.S! : "",
                }
                return fetchedUserDetails;
            }
            return res.Item;
        })
    }

    public getUserAuthDetails = (username: BasicUser["username"]) => {
        return ddbClient.send(new GetItemCommand({
            TableName: "users",
            Key: {
                username: { S: username },
            },
            ProjectionExpression: "username, email, password"
        })).then(res => {
            if(res.Item){
                const fetchedUserAuthDetails: UserAuth = {
                    username: res.Item.username.S!,
                    email: res.Item.email.S!,
                    password: res.Item.password.S!
                }
                return fetchedUserAuthDetails;
            }
            return res.Item;
        }).catch(err => {
            console.error(err);
            throw err;
        })
    }
}