import React from 'react'

const ChatUserList = () => {
    const onLineUser = [
        {
            name: "Lisha",
            message: "hii..",
            isSenderI: 1,
            time: "12:30 AM",
            unReadMesagesCount: 100,
            url: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg"
        },
        {
            name: "Arjun",
            message: "Lets go tomorrow",
            isSenderI: 0,
            time: "11:27 AM",
            unReadMesagesCount: 200,
            url: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
        },
        {
            name: "Ajay",
            message: "hii.., call me now",
            isSenderI: 1,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        },
        {
            name: "Anu",
            message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            isSenderI: 1,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-712513.jpg&fm=jpg"
        },
        {
            name: "Shrujan",
            message: "send me a ppt",
            isSenderI: 0,
            time: "Yesturday",
            unReadMesagesCount: 0,
            url: "https://htmlstream.com/preview/unify-v2.6/assets/img-temp/400x450/img5.jpg"
        },
        {
            name: "Faraj",
            message: "Time a leave??",
            isSenderI: 0,
            time: "30-07-2023",
            unReadMesagesCount: 0,
            url: "https://i.imgur.com/JFHjdNr.jpg"
        },
        {
            name: "Prajwal",
            message: "Ok",
            isSenderI: 0,
            time: "29-07-2023",
            unReadMesagesCount: 0,
            url: "https://www.bnl.gov/today/body_pics/2017/06/stephanhruszkewycz-hr.jpg"
        },
        {
            name: "Prashanth",
            message: "See u soon",
            isSenderI: 0,
            time: "21-07-2023",
            unReadMesagesCount: 0,
            url: "https://eq-cap.com/wp-content/uploads/2022/08/59A3501-cropped.jpg"
        },
        {
            name: "Siri",
            message: "Get me a pen , tomorrow",
            isSenderI: 1,
            time: "21-07-2023",
            unReadMesagesCount: 0,
            url: "https://media.istockphoto.com/id/1453851162/photo/portrait-of-beautiful-woman-with-blue-t-shirt-and-green-background-long-brown-hair-exterior.webp?b=1&s=170667a&w=0&k=20&c=huFDNScenntgxXkPNp5aDjr-KnUE_XqhE7OcHDvljXo="
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
        {
            name: "Prajwal",
            message: "Ok",
            isSenderI: 0,
            time: "29-07-2023",
            unReadMesagesCount: 0,
            url: "https://www.bnl.gov/today/body_pics/2017/06/stephanhruszkewycz-hr.jpg"
        },
        {
            name: "Prashanth",
            message: "See u soon",
            isSenderI: 0,
            time: "21-07-2023",
            unReadMesagesCount: 0,
            url: "https://eq-cap.com/wp-content/uploads/2022/08/59A3501-cropped.jpg"
        },
        {
            name: "Siri",
            message: "Get me a pen , tomorrow",
            isSenderI: 1,
            time: "21-07-2023",
            unReadMesagesCount: 0,
            url: "https://media.istockphoto.com/id/1453851162/photo/portrait-of-beautiful-woman-with-blue-t-shirt-and-green-background-long-brown-hair-exterior.webp?b=1&s=170667a&w=0&k=20&c=huFDNScenntgxXkPNp5aDjr-KnUE_XqhE7OcHDvljXo="
        },
        {
            name: "Kushi",
            message: "hii",
            isSenderI: 0,
            time: "20-07-2023",
            unReadMesagesCount: 0,
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
        },
        {
            name: "Surja",
            message: "How are u",
            isSenderI: 1,
            time: "15-07-2023",
            unReadMesagesCount: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUs73Mz3FqhV8uy2F5TGw_jGvFdzGirConJA&usqp=CAU"
        },
    ]
    return (
        <>
            <div className='overflow-y-scroll'>
                {
                    onLineUser.map((ele, i) => {
                        return (
                            <ul key={i} className='w-full flex justify-start items-center p-2 hover:bg-purple-100 hover:border-l-4 hover:border-l-purple-500 border-b-slate-100 border-b-2'>
                                <li >
                                    <img src={ele.url} alt="" className='w-[60px] h-[60px] min-w-[60px] border rounded-full bg-slate-100 object-fit aspect-square' />
                                </li>
                                <li className='w-full h-16 flex justify-between items-start ml-2'>
                                    <ul className='w-full flex flex-col justify-evenly h-16'>
                                        <li className='flex justify-between items-start'>
                                            <span className='text-lg font-semibold'>{ele?.name}</span>
                                            <span className='text-base font-normal text-slate-600'>{ele?.time}</span>
                                        </li>
                                        <li className='flex justify-between items-start truncate'>
                                            <span className='truncate w-48 text-base font-normal text-slate-600'>{ele?.isSenderI == 1 && 'you: '}{ele?.message}</span>
                                            {ele?.unReadMesagesCount !== 0 && <span className='text-lg font-semibold text-purple-500'>{ele?.unReadMesagesCount > 100 ? "100+" : ele?.unReadMesagesCount}</span>}
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        )
                    })
                }
            </div></>
    )
}

export default ChatUserList