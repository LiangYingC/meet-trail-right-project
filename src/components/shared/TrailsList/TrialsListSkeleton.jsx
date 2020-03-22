import React from 'react';
import { Skeleton } from '@material-ui/lab';

const TrailsListSkeleton = ({
    skeletonNum,
    isSkeletonContainerRow,
    isSkeletonItemRow
}) => {

    let skeletonList = []
    for (let i = 0; i < skeletonNum; i++) {
        skeletonList.push(i)
    }

    return (
        < div className={`skeleton-container ${isSkeletonContainerRow ? 'flex' : ''}`}>
            {skeletonList.map(index => {
                return (
                    <div className={`skeleton-item ${isSkeletonItemRow ? 'flex' : ''}`} key={index}>
                        <div className="skeleton-img">
                            <Skeleton variant="rect" animation="wave" width={'100%'} height={'100%'} />
                        </div>
                        <div className="skeleton-content">
                            <Skeleton animation="wave" width={'85%'} />
                            <Skeleton animation="wave" width={'55%'} />
                            <Skeleton animation="wave" width={'55%'} />
                            <Skeleton animation="wave" width={'55%'} />
                            <Skeleton animation="wave" width={'55%'} />
                            <Skeleton animation="wave" width={'55%'} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default TrailsListSkeleton;

