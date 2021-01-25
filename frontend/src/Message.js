export default function Message(props) {
  if (props.msg.text) {
    return <span><strong>{props.msg.username ? `${props.msg.username}: ` : ''}</strong>{props.msg.text}</span>
  } else {
    return (<span>
      {
        props.msg.joined ?
        `${props.msg.username} has joined the chat!` :
        `${props.msg.username} has left the chat`
      }
    </span>)
  }
}
