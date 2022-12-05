import { BasicUser, UserAuth, UserDetails } from "../types/User";

export interface User {
    /**
     * Creates new user
     * @param user for user details     
     */
    createUser(user: UserAuth): Promise<Boolean>;

    /** 
     * Get complete details of user
     * @param username User's username
     */
    getUserDetails(username: BasicUser["username"]): Promise<UserDetails | undefined>;

    /** 
     * Get UserAuth of user
     * @param username User's username
    */
    getUserAuthDetails(username: BasicUser["username"]): Promise<UserAuth | undefined>

}