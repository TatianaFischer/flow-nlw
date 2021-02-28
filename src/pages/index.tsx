
import Head from 'next/head';
import React from "react";
import { GetServerSideProps} from 'next';

import CompletedChallenges from '../componets/CompletedChallenges';
import Countdown from '../componets/Countdown';
import { ExperienceBar } from "../componets/ExperienceBar";
import Profile from '../componets/Profile';
import { ChallengeBox } from "../componets/ChallengeBox";

import styles from '../styles/pages/Home.module.css';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}
export default function Home(props: HomeProps) {
  console.log(props)
  return (

    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
      
    >
      <div className={styles.container}>
        <Head>
        

          <title>Início | Move.it</title>
        </Head>

        {/* //tudo que colocar dentro da tag Head o next coloca automaticamente para o head do html, essa é uma das formas de importar a fonte, mas no arquivo _documents.tsx tem outra forma para ser usado em todos os arquivos e vai ser carregado uma única vez, o que está aqui recalculado mais de uma vez  */}
        <ExperienceBar/>
        <CountdownProvider>    
          <section>
                <div>
                  <Profile/>
                  <CompletedChallenges/>
                  <Countdown/>
                </div>            
                <div>
                  <ChallengeBox/>
                </div>
            </section>
        </CountdownProvider>
        

      
      </div>
    </ChallengesProvider>
    
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {level, currentExperience, challengesCompleted}= ctx.req.cookies
;  

  return {
    props: {

      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}