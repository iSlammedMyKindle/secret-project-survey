"use client";

import Image from "next/image";
import {Model} from "survey-core";
import {Survey} from "survey-react-ui";
import 'survey-core/defaultV2.min.css';
import {FlatDark} from 'survey-core/themes/flat-dark';
import { useCallback } from "react";
import sendDataToCsv from "./saveResults";

export default function Home() {

  const survey = new Model({
    elements:[
      {
        type: "html",
        name: "welcome",
        html: `
        <style>
        p{
          margin-bottom:15px;
          border-bottom: 2px solid #343434;
        }
        </style>
        <h3>Welcome!</h3>
        <p>Greetings traveler... Thank you for stopping by! You've come far & wide to finally figure out what this project is all about...</p>
        <p>The time draws near for an answer... however, there is still much to be done. In the meantime, for this project to be <i>full</i>, I need <i>your</i> help.</p>
        <p>Your mission, should you choose to accept it, is to <b>Submit some fun facts!</b> These fun facts must follow these guidelines:
        
        <ol style="list-style:list-item">
          <li>They must be safe for work</li>
          <li>Not have any personal information</li>
          <li>Are ok to be public & telivised (secrets you don't want people knowing will be thrown out!)</li>
        </ol>
        </p>
        
        <p>Of all information sent to this form, I will select a total of <b>20</b> to be used. For what purpose you ask? Well... that remains to be seen, at least by you... <i>hehehAHAHAHAHAHAHA!</i></p>
        
        <p>One last thing, this information is being sent on a self-hosted server, it's not going anywhere else other than my personal devices or machines. For the nerds, I'll release the source code of this page later on github so you can poke at the insides.</p>
        <p>With that out of the way, and if you accept the challenge, type away!</p>`,
      },
      {
        type:'text',
        title:'Discord username',
        isRequired: true,
        name:'discorduser',
        description:"First things first, what's your discord username?! (e.g islammedmykindle)"
      },
      {
        type:"paneldynamic",
        title:'Insert facts!',
        name: 'insert-facts',
        description:'They can be about yourself, something you like, something random, etc. Place in as many as you like. To add another, select "add new"',
        panelCount:1,
        minPanelCount:1,
        maxPanelCount:10,
        templateElements:[
          {
            name:'fact',
            type: 'text',
            title:'Insert a fact!',
            isRequired: true
          }
        ]
      },
      {
        type: "checkbox",
        name: "fun",
        title: "Checkbox of Fun",
        description: "It is acknowledged that facts submitted on this form are purely for fun, and DO NOT contain sensitive information. Stuff that's too personal will be taken out",
        choices: "They are just for fun, promise",
        isRequired: true
      },
      {
        type: "checkbox",
        name: "no-turning-back",
        title: "Checkbox of No turning back",
        description: "It is acknowledged that you can't un-submit this form! However, you can contact me on discord if you want something removed.",
        choices: "Got it",
        isRequired: true,
        visibleIf: "{fun[0]} = 'They are just for fun, promise'"
      },
      {
        type: "checkbox",
        name: "affirmation",
        title: "Checkbox of Affirmation for telivisation",
        description: "It is acknowledged that entries of this form might be televised on mediums such as twitch. (possibly other places) If entries wern't made for that, turn back and make changes!",
        choices: "I am good with this stuff going out in the wild",
        isRequired: true,
        visibleIf: "{no-turning-back[0]} = 'Got it'"
      },
      {
        type: "checkbox",
        name: "finalsay",
        title: "Checkbox of Final say",
        description: "It is acknowledged that items may need to be modified if they are considered to be used in the secret project, but are not safe for work, or contain profanity.",
        choices: "I freaken understand",
        isRequired: true,
        visibleIf: "{affirmation[0]} = 'I am good with this stuff going out in the wild'"
      },
      {
        type: "html",
        name: "thats-it",
        html: "<h3>That's it, thanks!</h3>When you click \"complete\", entries will be submitted. I'll take a look at each one, only a few will be chosen!",
        visibleIf: "{finalsay[0]} = 'I freaken understand'"
      },
      {
        type: "text",
        name: "last-words",
        title: "Any Last words before sending it off?",
        visibleIf: "{finalsay[0]} = 'I freaken understand'"
      }
    ]
  });

  survey.applyTheme(FlatDark);
  survey.onComplete.add(useCallback(sender=>{
    sendDataToCsv(sender.data);
  }))

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src="/secretProjectSurvey.png" width={1500 * .6} height={500 * .6} alt="Secret project survey"/>
      <Survey model={survey}/>
    </main>
  );
}

console.log("%cMisfit when he opens the JS console to discover this secret message -> https://i.imgur.com/zSiae14.png", "color:lime");