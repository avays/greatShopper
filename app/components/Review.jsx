import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';

const makeStars = num => {
	let stars = [];
	for (let i = 0; i < num; i++) {
		stars.push(<Glyphicon key={`${i}`} glyph="star" />);
	}
	return stars;
};

export default ({ review }) => (
	<div className="review">
		<details>
			<summary>{ review.summary }</summary>
			<h6>Date purchased: { review.date }</h6>
			<span>Stars:
				{
					makeStars(review.stars)
				}
			</span>
			<h6>Upvotes: { review.upVotes }</h6>
			<h6>Downvotes: { review.downVotes }</h6>
		</details>
		<p id="review-text">{ review.text }</p>
	</div>
);
