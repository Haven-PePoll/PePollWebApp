import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { RootState } from './Store';
import { useDispatch, useSelector } from 'react-redux';
import { GetPoll } from './PollActions';
import { SetVote } from './VoteActions';
import { IVoteData } from './Vote';
import { useParams } from 'react-router-dom';
import { Button, Col, Row } from 'react-bootstrap';


export default function PollVotingPage() {
    const dispatch = useDispatch()

    const currentPoll = useSelector((state: RootState) => state.pollState.currentPoll)
    const [voted, setvoted] = useState("")

    const { id } = useParams();

    useEffect(() => {
        dispatch(GetPoll(id as string))
    }, [id])

    function setVote(option: string) {
        setvoted(option)
        dispatch(SetVote({ VotedForOption: option, PollName: currentPoll.Title, VotedAtTime: new Date() } as IVoteData))
    }

    function getRandomArbitrary(min:number, max:number) {
        return Math.trunc((Math.random() * (max - min) + min));
    }

    const votingView = () => {
        return (
            <div>
                {currentPoll && <h1>{currentPoll.Title}</h1>}
                <Row>
                    {currentPoll.Options && currentPoll.Options.map(
                        (option: string, index: number) => (
                            <Col>
                                <Button
                                    style={{ padding: 10, width: '100%', marginBottom: 10 }}
                                    type="submit"
                                    color="primary"
                                    onClick={() => setVote(option)}>
                                    {option}
                                </Button>
                            </Col>
                        )
                    )}
                </Row>
            </div>
        )
    }

    const thanksForVoting = () => {
        return (
            <div style={{textAlign: 'center'}}>
                {<h1>Thank you for voting!</h1>}
                {<h3 style={{fontWeight:'bold', marginTop: 15, color:'primary'}}>{getRandomArbitrary(1000, 5000)} others voted for {voted}</h3>}
            </div>
        )
    }

    return (
        <div className="App">
            {voted ? thanksForVoting() : votingView()}
        </div>
    );
}
