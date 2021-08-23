import Axios from "axios";

//Actions

const GET_CHAT = 'GET_CHAT'


//Action creators
export function getChat(messages) {
    return {
    type: GET_CHAT,
    messages
    }
  }
  
const newState = {
    messages: [
      {
        userId: 1,
        userName: 'ben',
        msg: 'hello world'
      },
      {
        userId: 2,
        userName: 'ray',
        msg: 'goodbye world'
      },
      {
        userId: 3,
        userName: 'drew',
        msg: 'afternoon world',
      },
      {
        userId: 4,
        userName: 'jai',
        msg: 'goodnight world',
      }
    ]

}



//Thunk creators
// export const getCurrentChat = () => {
//     console.log('test thunk')
//     return async (dispatch) => {
//         console.log('the thunk is called')
//     //   const response = await Axios.get("/api/robots");
//         // console.log('newState message>', newState.messages)
//       dispatch(getChat(newState.messages));
//     };
//   };




const initialState = {
  messages: [],
  //maybe a side thing
};





export default function chatroomReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHAT:
            return {...state, messages: action.messages}
        
        default:
            return state;
            

    }
}