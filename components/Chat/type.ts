export type selecteChatDto = {
    opponentId: String,
    opponentPic: string,
    opponentName: String,
    belongsTo: string,
    type: string,
}

export type ChatUserListDto = {
    selectedChat: selecteChatDto,
    setSelectedChat: any
    refetchList : any
    refetchUnReadMessages? : any,
    isViewProfile : Boolean,
    chatLeftSearch:string
}

export type ChatMessageDto = {
    selectedChat: selecteChatDto,
    socket :any,
    refetch : any
    setRefetchList: any,
    setIsSearch : Function,
    isSearch : boolean
}



export type ChatActionsDto = {
    selectedChat: selecteChatDto
    socket : any,
    isEmojiOpen : boolean,
    setIsEmojiOpen : Function
} 
