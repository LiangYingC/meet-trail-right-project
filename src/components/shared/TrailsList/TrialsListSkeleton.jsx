import React, { Fragment } from 'react';
import { Skeleton } from '@material-ui/lab';

const TrailsListSkeleton = ({ skeletonNum }) => {

    let skeletonList = []
    for (let i = 0; i < skeletonNum; i++) {
        skeletonList.push(i)
    }

    return (
        < div className="flex skeleton-container">
            {skeletonList.map(index => {
                return (
                    <div className="skeleton-item">
                        <div className="skeleton-img" key={index}>
                            <Skeleton variant="rect" animation="wave" width={'100%'} height={'100%'} />
                        </div>
                        <div className="skeleton-content">
                            <Skeleton animation="wave" width={'85%'} />
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

