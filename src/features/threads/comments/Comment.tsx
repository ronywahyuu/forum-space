import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatTimeAgo } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { downvoteCommentAsync, neutralizeVoteCommentAsync, selectCommentStatus, selectUpvoteCount, upvoteCommentAsync } from "./commentSlice";
import ActionTooltip from "@/components/ActionTooltip";
import { Button } from "@/components/ui/button";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { useGetCurrentUserQuery } from "@/features/auth/authApiSlice";
import type { Comment as CommentType } from "@/types/thread"
import { useDownvoteCommentMutation, useNeutralizeVoteCommentMutation, useUpvoteCommentMutation } from "../threadsApiSlice";

interface CommentProps {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const { id: threadId } = useParams();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetCurrentUserQuery();
  const [upvoteComment] = useUpvoteCommentMutation()
  const [downvoteComment] = useDownvoteCommentMutation()
  const [neutralizeVoteComment] = useNeutralizeVoteCommentMutation()
  const currentUserId = !isLoading ? data?.data.user.id : null;
  const isUpvotedByCurrentUser = comment.upVotesBy.includes(currentUserId as string);
  const isDownvotedByCurrentUser = comment.downVotesBy.includes(currentUserId as string);


  const handleUpVote = async () => {
    // await dispatch(upvoteCommentAsync({ threadId: threadId as string, commentId: comment.id }));
    await upvoteComment({ threadId: threadId as string, commentId: comment.id })
  };

  const handleDownVote = async () => {
    // await dispatch(downvoteCommentAsync({ threadId: threadId as string, commentId: comment.id }));
    await downvoteComment({ threadId: threadId as string, commentId: comment.id })
  };

  const handleNeutralizeVote = async () => {
    // await dispatch(neutralizeVoteCommentAsync({ threadId: threadId as string, commentId: comment.id }));
    await neutralizeVoteComment({ threadId: threadId as string, commentId: comment.id })
  };

  console.log({ isUpvotedByCurrentUser })

  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={comment.owner.avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <span className='text-2x'>{comment.owner.name}</span>
            <div className='flex items-center'>
              <span className='text-gray-500'>{
                formatTimeAgo(comment.createdAt)
              }</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <ActionTooltip label={isUpvotedByCurrentUser ? 'Remove Like' : 'Like'}>
          <Button variant="outline" className='rounded-xl flex gap-2' onClick={isUpvotedByCurrentUser ? handleNeutralizeVote : handleUpVote}>
            {isUpvotedByCurrentUser ? <BiSolidLike className='w-4' /> : <BiLike className='w-4' />}
            <span>{comment.upVotesBy.length}</span>
          </Button>
        </ActionTooltip>

        <ActionTooltip label={isDownvotedByCurrentUser ? 'Remove Dislike' : 'Dislike'}>
          <Button variant="outline" className='rounded-xl flex gap-2' onClick={isDownvotedByCurrentUser ? handleNeutralizeVote : handleDownVote}>
            {isDownvotedByCurrentUser ? <BiSolidDislike className='w-4' /> : <BiDislike className='w-4' />}
            <span>{comment.downVotesBy.length}</span>
          </Button>
        </ActionTooltip>
      </CardFooter>

    </Card>
  );
};

export default Comment;
