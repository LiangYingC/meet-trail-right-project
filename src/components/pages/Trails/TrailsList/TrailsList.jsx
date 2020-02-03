import React, { Component } from 'react';
import {
    HashRouter as Router,
    Link
} from "react-router-dom";

const TrailsList = ({ trailsData }) => {
    return (
        <section className="trails-List">
            <div className="wrap">
                {trailsData.map(trail => {
                    return (
                        <Router>
                            <div>
                                <Link to={`/trails/detail/${trail.id}`}>{trail.id}</Link>
                            </div>
                        </Router>
                    )
                })}
            </div>
        </section>
    )
}

export default TrailsList