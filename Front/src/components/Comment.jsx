/* eslint-disable react/prop-types */

import { transformDate } from "../utils"

const Comment = ({ comment }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="min-w-10 h-10 flex rounded-full bg-gray-200 overflow-hidden">
        <img src={comment.author.avatar} alt="user" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-base text-gray-800">{comment.author.firstname + ' ' + comment.author.lastname}</p>
        <p className="text-sm text-gray-700 max-w-[300px]">{comment.content}</p>
        <p className="text-xs text-gray-500">{transformDate(comment.creationDate)}</p>
      </div>
    </div>
  )
}

export default Comment