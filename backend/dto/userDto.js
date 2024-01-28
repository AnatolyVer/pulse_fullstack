class UserDto {
    constructor(user) {
        this._id = user._id;
        this.nickname = user.nickname;
        this.username = user.username;
        this.avatar_url = user.avatar_url;
        this.bio = user.bio;
        this.chats = user.chats;
        this.online = user.online;
        this.last_seen = user.last_seen;
    }
}

class PublicUserDto {
    constructor(user) {
        this._id = user._id;
        this.nickname = user.nickname;
        this.username = user.username;
        this.avatar_url = user.avatar_url;
        this.bio = user.bio;
        this.online = user.online;
        this.last_seen = user.last_seen;
    }
}

module.exports = {
    UserDto,
    PublicUserDto
};
