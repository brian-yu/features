import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";
import Tilt from 'react-parallax-tilt';
import { motion, useAnimation } from "framer-motion"

import { API_HOST } from '../../constants';
import './Vote.css';


interface Item {
    text: string;
    id: number;
}

const VoteCard = (props: any) => {

    let { item, voteFunc, isDummy } = props;

    const controls = useAnimation();

    const handleVote = (action: string) => {

        if (isDummy) return;

        if (item) {
            let actionEffect = {};
            switch (action) {
                case 'upvote':
                    actionEffect = {x: '100vw'};
                    break;
                case 'downvote':
                    actionEffect = {x: '-100vw'};
                    break;
                case 'skip':
                    actionEffect = {y: '100vh'};
                    break;
            }

            const effect = Object.assign({}, {
                opacity: 0,
                transition: { duration: .75 },
            }, actionEffect);

            controls.start(effect).then(() => {
                controls.start({
                    x: "-50%",
                    opacity: 1,
                    transition: {duration: 0}
                })
                voteFunc(action, item);
            })
        }
    }

    const ItemText = () => {
        if (item) {
            return <h3 className="title">{item.text}</h3>
        }
        return <h3 className="title">🎉 You're all done! 🎉</h3>
    }

    
    return (
        <motion.div
            className="vote-card"
            initial={{ x: "-50%", opacity: 1 }}
            animate={controls}
            key={item ? item.id : -1}>
            <Tilt
                tiltMaxAngleX={2}
                tiltMaxAngleY={2}
                glareEnable={true}
            >
                <div className="card">
                    <div className="card-content">
                        <ItemText />
                    </div>
                    <footer className="card-footer">
                        <a onClick={() => handleVote('downvote')} className="card-footer-item">
                            <span role="img" aria-label="downvote">👎</span>
                        </a>
                        <a onClick={() => handleVote('skip')} className="card-footer-item">
                            <span role="img" aria-label="skip">⬇️</span>
                        </a>
                        <a onClick={() => handleVote('upvote')} className="card-footer-item">
                            <span role="img" aria-label="upvote">👍</span>
                        </a>
                    </footer>
                </div>
            </Tilt>
        </motion.div>
    )
}

const Vote = () => {

    let { id } = useParams();

    const [items, setItems] = useState<Array<Item>>([]);
    const [itemIdx, setItemIdx] = useState(0);

    useEffect(() => {
        fetch(`${API_HOST}/forms/${id}`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                setItems(data.items);
            })
    }, [id]);

    const handleVote = (action: string, item: Item) => {

        console.log(action, item);

        // TODO: SEND POST REQUEST.

        setItemIdx(itemIdx + 1);
    }

    return (
        <div className="container vote">
            <h1>Hello! Vote on form {id}</h1>
            <div className="vote-card-container">

                <VoteCard
                    item={items[itemIdx+1]}
                    isDummy={true}
                    voteFunc={handleVote} />
                <VoteCard
                    item={items[itemIdx]}
                    voteFunc={handleVote} />

            </div>
        </div>
    )
}

export default Vote;