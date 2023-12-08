import React, { useEffect, useState } from 'react';
import './CommentReview.scss';
import { Avatar } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import comment from '~/mockdata/comment.json';
import publicAccomPlaceAPI from '~/services/apis/publicAPI/publicAccomPlaceAPI';
export default function CommentReview(props) {
    const [dataComment, setDataaCommet] = useState([]);
    const [showMoreComments, setShowMoreComments] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        publicAccomPlaceAPI.getReviewHome(props.id).then((res) => {
            setDataaCommet(res.data);
            if (res.data.length > 0) {
                setLoading(false);
            }
        });
    }, []);
   

    const commentsToShow = showMoreComments ? dataComment : dataComment.slice(0, 5);
    return (
        <>
            {loading ? (
                <div className="container__emtyComment">
                     <p>Chưa có bình luận nào</p>
                    <img src="/src/assets/video/crabtyping.gif" className='emtyComment'></img>
                   
                </div>
            ) : (
                <div className="paper container-comments">
                    {commentsToShow.map((item, index) => (
                        <div key={index} className="container-comment">
                            <div className="commentator">
                                <Avatar className="commentator-avatar" alt="Cindy Baker" src={item.avatarUserUrl} />
                                <div className="commentator-name">{item.lastName}</div>
                            </div>
                            <div className="comment-info">
                                <div className="heading">
                                    <div>{StarRating(item.rateStar)}</div>

                                    <div className="comment-time">
                                        <AccessTimeIcon />
                                        <p> {item.createdDate}</p>
                                    </div>
                                </div>

                                <div className="comment-content"> {item.content}</div>
                                {item.haveImage === true && (
                                    <div className="image-list">
                                        {item.imageReviewUrls.map((image, imageIndex) => (
                                            <img
                                                key={imageIndex}
                                                src={image}
                                                // alt={`Image ${imageIndex}`}
                                                className="comment-image"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    <div className="thelast">
                        {dataComment.length > 5 && (
                            <button onClick={() => setShowMoreComments(!showMoreComments)} className="show-more-button">
                                {showMoreComments ? 'Thu gọn' : 'Xem thêm'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

function StarRating(rating) {
    const stars = Array.from({ length: rating }, (_, index) => (
        <span key={index} className="star-full">
            &#9733;
        </span>
    ));
    const emptyStars = Array.from({ length: 5 - rating }, (_, index) => (
        <span key={index} className="star-empty">
            &#9734;
        </span>
    ));

    return (
        <div className="star-rating">
            {stars}
            {emptyStars}
        </div>
    );
}
