import React from 'react';
import AuthUserContext from '../../../contexts/AuthUserContext';
import { DB } from '../../../lib';

const LikeButton = ({
    trailId,
    toggleLoginBox
}) => {

    const updateUserLikeData = (userid, newLikeList) => {
        DB.ref('users').doc(userid)
            .update({
                like_list: newLikeList
            })
    }

    const updateTrailLikeData = (trailId, newTrailLikeUserList, newTrailLikeCount) => {
        DB.ref('trails').doc(trailId)
            .update({
                like_data: {
                    users: newTrailLikeUserList,
                    count: newTrailLikeCount
                }
            })
    }

    const toggleLike = (e, userData, isLogin, trailId) => {
        e.preventDefault()
        if (isLogin) {
            let isLiked = false
            userData.likeList.forEach(likeItem => {
                if (likeItem.id === trailId) {
                    isLiked = true
                }
            })

            if (isLiked) {
                const newLikeList = userData.likeList.filter(likeItem => likeItem.id !== trailId)
                updateUserLikeData(userData.id, newLikeList)

                DB.ref('trails').doc(trailId)
                    .get()
                    .then(doc => {
                        const trailLikeUserList = doc.data().like_data.users
                        const newTrailLikeCount = doc.data().like_data.count - 1
                        const newTrailLikeUserList = trailLikeUserList.filter(likeUserId => likeUserId !== userData.id)
                        updateTrailLikeData(trailId, newTrailLikeUserList, newTrailLikeCount)
                    })

            } else {
                const newLikeList = userData.likeList
                newLikeList.push({
                    id: trailId,
                    timestamp: new Date()
                })
                updateUserLikeData(userData.id, newLikeList)

                DB.ref('trails').doc(trailId)
                    .get()
                    .then(doc => {
                        const trailLikeUserList = doc.data().like_data.users
                        const newTrailLikeCount = doc.data().like_data.count + 1
                        trailLikeUserList.push(userData.id)
                        updateTrailLikeData(trailId, trailLikeUserList, newTrailLikeCount)
                    })
            }
        } else {
            toggleLoginBox()
        }
    }

    return (
        <AuthUserContext.Consumer>{
            ({
                userData,
                isLogin
            }) => {
                let isLiked = false
                userData.likeList.forEach(likeItem => {
                    if (likeItem.id === trailId) {
                        isLiked = true
                    }
                })

                return (
                    <div className="like-button">
                        <i className={`far fa-heart ${isLiked ? 'active' : ''}`}
                            onClick={(e) => toggleLike(e, userData, isLogin, trailId)}
                            name={trailId}>
                        </i>
                    </div>
                )
            }

        }
        </AuthUserContext.Consumer>
    )
}

export default LikeButton;