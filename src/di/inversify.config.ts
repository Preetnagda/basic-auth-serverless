import "reflect-metadata";
import { Container } from 'inversify';
import { User as UserService } from "../services/user.service";
import {User as DynamoDbUserService} from "../services/dynamodb/user.service.dynamodb";
import TYPES from "./types";

let container = new Container();

container.bind<UserService>(TYPES.UserService).to(DynamoDbUserService);

export default container;