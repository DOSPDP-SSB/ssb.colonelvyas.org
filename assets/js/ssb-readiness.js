/**
 * DOSPDP - SSB Readiness Diagnostic & Assessment Engine
 * 25-Stage Psychometric & Reflex Evaluation System
 * Designed by Col Vyas (Retd.)
 */

(function () {
  'use strict';

  /* ====================================================
     ASSESSMENT DATA — 25 QUESTIONS
  ==================================================== */
  const assessmentData = [
    {
      category: "Professional Courage", time: 20,
      text: "You are the newest member of a mixed-department project team. Three days ago you spotted a critical flaw in the plan being developed — one that could cause project failure during execution. At the time you weren't fully confident, so you said nothing. Today, in a client-facing meeting, your senior presents that same flawed plan. You are now certain.",
      options: [
        { text: "A. Say nothing. You had your chance three days ago — this is now the senior's responsibility.", traits: { Responsibility: -2, Courage: -2 } },
        { text: "B. Interrupt and raise the flaw immediately, addressing the room directly.", traits: { Courage: 2, Practicality: -1, Social_Adaptability: -1 } },
        { text: "C. Slide a written note to the senior quietly during the meeting.", traits: { Practicality: 2, Social_Adaptability: 1 } },
        { text: "D. Ask a 'clarifying question' in the meeting that indirectly brings up the issue without naming it.", traits: { Social_Adaptability: 2, Reasoning: 1 } },
        { text: "E. Raise it in the meeting: 'I'd like to revisit one element before we finalize, if we may.'", traits: { Courage: 1, Leadership: 1, Social_Adaptability: 1 } },
        { text: "F. Wait for a natural break and pull the senior aside before the client sees the proposal signed off.", traits: { Practicality: 2, Teamwork: 1 } },
        { text: "G. Say nothing now. Send a detailed follow-up email to the senior immediately after the meeting.", traits: { Responsibility: -1, Courage: -1 } },
        { text: "H. Speak to a senior colleague you trust and ask them to raise it on your behalf.", traits: { Courage: -1, Influence: -1 } }
      ]
    },
    {
      category: "Integrity", time: 20,
      text: "You are selected for a prestigious national scholarship after a tough competitive process. One week later, you accidentally discover — through a wrongly placed document — that a candidate widely considered stronger than you was disqualified before the process began due to a clerical error. The error was the institution's fault. No one knows you've seen this. The scholarship award has been publicly announced.",
      options: [
        { text: "A. Say nothing. You competed fairly under the rules as you understood them — the error was not yours.", traits: { Integrity: -1, Practicality: 1 } },
        { text: "B. Immediately report the error to the selection committee and accept whatever outcome follows.", traits: { Integrity: 3, Courage: 2 } },
        { text: "C. Contact the disqualified candidate directly and inform them, letting them decide how to proceed.", traits: { Empathy: 1, Integrity: 1 } },
        { text: "D. Look into whether the error actually changed the outcome before deciding whether to act.", traits: { Reasoning: 2, Practicality: 1 } },
        { text: "E. Approach the institution and suggest that both candidates be reconsidered.", traits: { Leadership: 2, Integrity: 2 } },
        { text: "F. Seek private advice from a mentor you trust before doing anything.", traits: { Practicality: 1, Confidence: -1 } },
        { text: "G. Report it anonymously so the institution can correct it without you being identified.", traits: { Integrity: 1, Courage: -1 } },
        { text: "H. Decline the scholarship quietly and give personal reasons, without revealing the real reason.", traits: { Integrity: 1, Courage: -1, Practicality: -1 } }
      ]
    },
    {
      category: "Risk Calculation", time: 20,
      text: "During a group trek, a teammate slips and is hanging from a rocky ledge by both hands. You are the closest — roughly two meters away. A rope is available but properly securing it would take approximately three minutes. Reaching down bare-handed is physically possible but carries real risk if your footing gives way. The person's grip is visibly weakening.",
      options: [
        { text: "A. Reach down immediately and pull them up. Every second matters and hesitation will cost them their grip.", traits: { Courage: 2, Practicality: -1 } },
        { text: "B. Take the full time to anchor the rope correctly. A properly organized rescue is safer for both of you.", traits: { Practicality: 2, Courage: -1 } },
        { text: "C. Reach partway down with one arm, brace your footing, while shouting to others to anchor the rope at the same time.", traits: { Leadership: 2, Practicality: 1, Courage: 1 } },
        { text: "D. First ask the person how their grip feels and estimate how long they can hold — then decide your approach.", traits: { Reasoning: 2, Emotional_Stability: 1 } },
        { text: "E. Assign rope anchoring to two others and position yourself to reach the moment the rope is ready — in under a minute.", traits: { Organizing: 2, Leadership: 2 } },
        { text: "F. Direct the entire group immediately — specific tasks, specific people — while staying in voice contact with the hanging person.", traits: { Leadership: 3, Organizing: 2 } },
        { text: "G. Call emergency services immediately. Untrained ledge rescues kill two people instead of one. Keep the person calm and talking.", traits: { Practicality: -1, Reasoning: 1 } }
      ]
    },
    {
      category: "Conscience vs. Authority", time: 20,
      text: "Your superior gives you a direct instruction that is legal, within their authority, and carries clear benefits for your career if followed. You believe the instruction is clearly unfair to a junior team member who has done nothing wrong. Questioning it may have professional consequences for you.",
      options: [
        { text: "A. Comply without comment. Authority exists for a reason, and this is not your call to make.", traits: { Courage: -2, Integrity: -1 } },
        { text: "B. Comply, then quietly inform the junior member that you disagreed and let them seek their own recourse.", traits: { Courage: -1, Empathy: 1 } },
        { text: "C. Request a private meeting with your superior before acting, and express your concern directly.", traits: { Courage: 2, Leadership: 1, Integrity: 2 } },
        { text: "D. Comply and separately raise your concern through an official complaint channel after the fact.", traits: { Courage: -1, Integrity: 1 } },
        { text: "E. Ask your superior to put the instruction in writing before you carry it out.", traits: { Practicality: 2, Courage: 1 } },
        { text: "F. Refuse to comply and state your reasons clearly, accepting the professional consequences.", traits: { Courage: 3, Integrity: 3, Practicality: -1 } },
        { text: "G. Approach another senior peer and ask them to step in before you act.", traits: { Courage: -1, Social_Adaptability: 1 } },
        { text: "H. Inform the junior member privately first, then decide based on how they respond.", traits: { Integrity: -1, Practicality: -1 } },
        { text: "I. Comply, write down the instruction and your objection, and keep it on file.", traits: { Practicality: 2, Integrity: 1 } }
      ]
    },
    {
      category: "Leadership", time: 20,
      text: "You are one of six members of a competition team with two weeks remaining. Three members have stopped participating — missing practice and lowering morale. The official team leader is present but doing nothing visible to address it. Your institution's reputation is at stake.",
      options: [
        { text: "A. Speak to each disengaged member privately and individually — find out what's actually happening with them.", traits: { Leadership: 2, Empathy: 2 } },
        { text: "B. Raise the issue openly in the next team meeting without singling anyone out.", traits: { Courage: 1, Communication: 1 } },
        { text: "C. Approach the team leader privately and tell them the team is at risk — put the responsibility on them.", traits: { Leadership: 1, Practicality: 1 } },
        { text: "D. Go directly to the faculty coordinator and report the situation before it's too late.", traits: { Practicality: 1, Teamwork: -1 } },
        { text: "E. Take on informal leadership yourself — start organizing practice, setting small deadlines, pulling people back in.", traits: { Initiative: 3, Leadership: 3, Organizing: 2 } },
        { text: "F. Focus entirely on your own preparation. You can't carry everyone, and trying might pull your own performance down.", traits: { Teamwork: -2, Leadership: -2 } },
        { text: "G. Suggest to the team leader that the underperforming members be replaced by willing alternates.", traits: { Practicality: 2, Reasoning: 1 } },
        { text: "H. Take on additional work quietly to cover the gaps and say nothing — let the performance speak.", traits: { Determination: 2, Leadership: -1 } }
      ]
    },
    {
      category: "Social Courage", time: 20,
      text: "During a timed field exercise, you watch a well-liked senior batchmate take a shortcut the rules clearly prohibit. Four others see it. No one speaks. The senior catches your eye and gives a clear 'stay quiet' signal. Reporting will make you unpopular. The senior will almost certainly win the exercise because of the shortcut.",
      options: [
        { text: "A. Say nothing. It's a field exercise, not a war — the consequences of reporting outweigh a minor rule-break.", traits: { Integrity: -2, Courage: -2 } },
        { text: "B. Report it to the supervising officer immediately, before the results are recorded.", traits: { Integrity: 3, Courage: 2 } },
        { text: "C. Approach the senior privately right after and tell them clearly that they should self-report.", traits: { Integrity: 2, Leadership: 1 } },
        { text: "D. Raise the issue during the debrief without naming anyone — bring it up as a process concern.", traits: { Social_Adaptability: 1, Courage: 1 } },
        { text: "E. Speak to the other witnesses and act based on what the group decides together.", traits: { Courage: -1, Teamwork: 1 } },
        { text: "F. Report it anonymously after the exercise concludes.", traits: { Integrity: 1, Courage: -1 } },
        { text: "G. Confront the senior in the moment — visibly and clearly — before the shortcut is complete.", traits: { Courage: 3, Integrity: 2, Practicality: -1 } },
        { text: "H. Say nothing now, but write down what you saw in case it becomes relevant to something larger later.", traits: { Integrity: -1, Practicality: 1 } }
      ]
    },
    {
      category: "Transparency", time: 20,
      text: "You are completing a report that will guide a major budget decision. The data strongly supports one conclusion. You are aware of a flaw in the research method that could weaken the conclusion — a flaw your colleagues don't know about, and which would require two weeks to properly check. The submission deadline is tomorrow.",
      options: [
        { text: "A. Submit as-is. The data is the best available, the flaw is unlikely to change the conclusion, and delay has costs.", traits: { Integrity: -2, Practicality: 1 } },
        { text: "B. Delay submission and inform your supervisor that proper analysis requires two additional weeks.", traits: { Integrity: 2, Courage: 1 } },
        { text: "C. Submit on time but include a clear, open acknowledgment of the flaw and its possible significance.", traits: { Integrity: 3, Reasoning: 2, Practicality: 2 } },
        { text: "D. Inform your supervisor of the flaw and let them decide how to proceed.", traits: { Integrity: 1, Responsibility: 1 } },
        { text: "E. Spend tonight trying to check the flaw and submit whatever you find, with clear notes.", traits: { Determination: 2, Practicality: 1 } },
        { text: "F. Submit the report and verbally mention the flaw at the decision-making meeting without putting it in writing.", traits: { Integrity: 0, Courage: 1 } },
        { text: "G. Ask a qualified colleague to quickly assess how serious the flaw is before you decide.", traits: { Reasoning: 1, Teamwork: 1 } }
      ]
    },
    {
      category: "Emotional Control", time: 20,
      text: "In front of your entire group, a peer accuses you of taking too much credit for work that was a team effort. This is partially true — you did lead the work — but the accusation is exaggerated. The room is watching and waiting for your response. You feel the heat of the moment.",
      options: [
        { text: "A. Deny it clearly and confidently. In a public setting, a passive response will be read as admission.", traits: { Emotional_Stability: -1, Confidence: 2 } },
        { text: "B. Acknowledge your role honestly, including where the credit should have been shared more clearly.", traits: { Integrity: 2, Emotional_Stability: 2, Leadership: 1 } },
        { text: "C. Stay completely calm, thank the person for raising it, and suggest a private conversation afterward.", traits: { Emotional_Stability: 3, Social_Adaptability: 2 } },
        { text: "D. Ask the accuser to be specific — invite them to point to exactly what was wrongly attributed.", traits: { Reasoning: 2, Confidence: 1 } },
        { text: "E. Say nothing. Responding publicly gives this more attention. Resolve it later.", traits: { Courage: -1, Confidence: -1 } },
        { text: "F. Address the group directly with your account of the team's work — who did what and when.", traits: { Communication: 2, Reasoning: 1 } },
        { text: "G. Publicly acknowledge the team's contributions in full, without accepting or rejecting the way the accusation was framed.", traits: { Social_Adaptability: 2, Leadership: 1 } },
        { text: "H. Ask a team member who was present to speak to what they observed.", traits: { Reasoning: 1, Confidence: -1 } }
      ]
    },
    {
      category: "Moral Courage", time: 20,
      text: "Your closest friend is being evaluated for a position of significant responsibility. The selectors casually ask for your impressions. Your friend is skilled. However, you have directly seen on two occasions — in private — behavior that raises serious questions about their integrity under pressure. Your friend is counting on your support.",
      options: [
        { text: "A. Support your friend fully. What you observed was private and context-specific — it's not your information to share.", traits: { Integrity: -2, Social_Adaptability: 1 } },
        { text: "B. Inform the selectors of your specific concerns, knowing it will likely cost you the friendship.", traits: { Integrity: 3, Courage: 2 } },
        { text: "C. Speak to your friend first and give them the chance to disclose the relevant information themselves, or withdraw.", traits: { Integrity: 2, Empathy: 2, Leadership: 1 } },
        { text: "D. Remove yourself from giving any informal input and tell the selectors you're too close to comment fairly.", traits: { Practicality: 2, Integrity: 1 } },
        { text: "E. Give a neutral, strictly factual reference that neither builds nor undermines the case.", traits: { Social_Adaptability: 1, Courage: -1 } },
        { text: "F. Share your observations only if you are directly and specifically asked about integrity or behavior under pressure.", traits: { Integrity: 1, Courage: -1 } },
        { text: "G. Recommend your friend warmly but suggest the selectors conduct a more thorough structured evaluation.", traits: { Integrity: -1, Practicality: 1 } }
      ]
    },
    {
      category: "Decision-Making", time: 20,
      text: "You are leading a four-person team required to submit a single recommendation. Two members are committed to Option A. Two are committed to Option B. Both options have genuine merit — this is not a case of one being clearly better. No one will give in. The deadline is one hour away.",
      options: [
        { text: "A. Submit your personal best judgment and own it as the leader's call.", traits: { Leadership: 2, Confidence: 2 } },
        { text: "B. Request a deadline extension and continue working through the disagreement.", traits: { Practicality: -1, Courage: -1 } },
        { text: "C. Ask each person to argue for the opposing option and see if the exercise shifts any position.", traits: { Leadership: 2, Reasoning: 2 } },
        { text: "D. Submit a combined recommendation that takes the strongest elements of both options.", traits: { Practicality: 2, Organizing: 1 } },
        { text: "E. Ask the group: 'If you had thirty seconds and had to decide alone, which would you choose and why?' — then act on the pattern.", traits: { Leadership: 2, Initiative: 1 } },
        { text: "F. Identify which option has the lower downside risk if it turns out to be wrong, and submit that.", traits: { Reasoning: 3, Practicality: 2 } },
        { text: "G. Bring in a neutral outside person to break the tie.", traits: { Confidence: -1, Leadership: -1 } },
        { text: "H. Ask the team to define the single most important factor for this decision — then score both options against it.", traits: { Reasoning: 3, Organizing: 2, Leadership: 2 } }
      ]
    },
    {
      category: "Authenticity", time: 20,
      text: "You are about to be evaluated for a leadership position you genuinely want. The evaluator is well-known for preferring decisive, assertive, fast-acting candidates. You are naturally careful and consultative — qualities you believe have consistently produced better outcomes. Adapting to what the evaluator wants feels like a small calculated compromise.",
      options: [
        { text: "A. Fully adapt your presentation to the evaluator's preferences. Once selected, you'll lead in your own way.", traits: { Integrity: -1, Practicality: 2 } },
        { text: "B. Present your actual leadership approach honestly, and let the outcome be what it is.", traits: { Integrity: 3, Confidence: 2 } },
        { text: "C. Present honestly but clearly show your adaptability — demonstrate you can be decisive when speed is what a situation demands.", traits: { Practicality: 2, Confidence: 2, Adaptability: 2 } },
        { text: "D. Ask the evaluator at the start about the specific leadership demands of the role before deciding how to present yourself.", traits: { Social_Adaptability: 1, Reasoning: 1 } },
        { text: "E. Present a version of yourself that is genuine but deliberately highlights the qualities the evaluator values.", traits: { Practicality: 2, Social_Adaptability: 2 } },
        { text: "F. Present both styles as a strength — situational leadership — and give examples of when you've used each.", traits: { Adaptability: 3, Leadership: 2, Reasoning: 2 } }
      ]
    },
    {
      category: "Accountability", time: 20,
      text: "You missed a critical team deadline. The reason was a severe personal crisis — one you handled privately and that has now passed. Your team does not know the reason and has assumed you were careless. The team is carrying leftover frustration. Explaining the crisis would mostly clear your name.",
      options: [
        { text: "A. Explain the crisis fully. Your team deserves the truth and you deserve to be understood.", traits: { Transparency: 2, Teamwork: 1 } },
        { text: "B. Stay silent. Personal matters are personal. You'll make up for it through extra work going forward.", traits: { Responsibility: 2, Emotional_Stability: 2 } },
        { text: "C. Acknowledge the impact fully and apologize — without going into the specific details of why.", traits: { Emotional_Stability: 2, Leadership: 1 } },
        { text: "D. Apologize and provide a clear plan showing exactly how you'll prevent a repeat — nothing more.", traits: { Practicality: 2, Responsibility: 2 } },
        { text: "E. Share the full context with your team leader only, in private, and let them decide what the wider team needs to know.", traits: { Social_Adaptability: 2, Communication: 1 } },
        { text: "F. Ask a close teammate to quietly share the context on your behalf rather than explaining directly.", traits: { Courage: -1, Confidence: -1 } }
      ]
    },
    {
      category: "Independent Thinking", time: 20,
      text: "Your entire team has reached enthusiastic agreement on an approach to a high-stakes problem. Everyone is aligned and moving forward. You have a strong, specific feeling that they've missed a critical factor — but you cannot yet fully explain your thinking. You are not certain you're right. You are also not certain you're wrong.",
      options: [
        { text: "A. Go along. You can't form a clear argument, and stopping group momentum based on a feeling could waste everyone's time.", traits: { Courage: -2, Initiative: -1 } },
        { text: "B. Raise your concern out loud, even without a complete argument. State that something doesn't feel resolved.", traits: { Courage: 2, Integrity: 1 } },
        { text: "C. Ask for fifteen minutes before the group proceeds — to think it through and either confirm or dismiss your concern.", traits: { Reasoning: 2, Practicality: 2 } },
        { text: "D. Ask a targeted question about the specific factor you're sensing, without saying that you think the plan is wrong.", traits: { Social_Adaptability: 2, Reasoning: 2 } },
        { text: "E. Proceed with the group while doing your own quiet parallel analysis — and be ready to raise it if the concern becomes clearer.", traits: { Practicality: 2, Teamwork: 1 } },
        { text: "F. Take one trusted team member aside, share your instinct, and see whether they share it before acting.", traits: { Teamwork: 1, Social_Adaptability: 1 } },
        { text: "G. Voice it and ask the group to stress-test the plan for ten minutes before committing — frame it as discipline, not doubt.", traits: { Leadership: 3, Reasoning: 2 } }
      ]
    },
    {
      category: "Honesty", time: 20,
      text: "You submitted a report that contained a significant error. Initially unsure of the source, you told your superior that it was likely a data input issue from another department. That department is now being formally questioned. You have since confirmed, without any doubt, that the error was yours.",
      options: [
        { text: "A. Come forward immediately and correct the record entirely — to your superior and to the other department.", traits: { Integrity: 3, Courage: 3, Responsibility: 2 } },
        { text: "B. Quietly correct your report going forward and say nothing — hope the investigation reaches the right conclusion on its own.", traits: { Integrity: -3, Responsibility: -2 } },
        { text: "C. Correct the record with your superior privately, but let them decide how to handle the other department.", traits: { Integrity: 1, Courage: 1 } },
        { text: "D. Consult a trusted colleague on the right approach before doing anything.", traits: { Confidence: -1, Courage: -1 } },
        { text: "E. Frame it as 'new information I've discovered' rather than clearly admitting that your earlier statement was wrong.", traits: { Integrity: -1, Social_Adaptability: 1 } },
        { text: "F. Go directly to the person in the other department being questioned and privately tell them what you've found.", traits: { Empathy: 1, Integrity: 1 } },
        { text: "G. Submit a written correction without referring to your initial incorrect statement.", traits: { Responsibility: 1, Courage: -1 } }
      ]
    },
    {
      category: "Social Courage", time: 20,
      text: "During an important group discussion, the most respected and influential member of your group states something that is clearly and significantly wrong as a fact. Others in the room are accepting it and building on it. Correcting them will likely be seen as arrogant, confrontational, or politically motivated — even though you are clearly correct.",
      options: [
        { text: "A. Stay silent. The error will surface on its own eventually, and you can clarify with individuals afterward.", traits: { Courage: -2, Practicality: 1 } },
        { text: "B. Correct it directly, calmly, and immediately — respectfully but without softening the substance.", traits: { Courage: 3, Integrity: 2 } },
        { text: "C. Ask a 'clarifying question' designed to give the person the opportunity to catch their own error.", traits: { Social_Adaptability: 3, Leadership: 2 } },
        { text: "D. Raise a connected point that, without confrontation, naturally introduces the correct information.", traits: { Social_Adaptability: 2, Reasoning: 2 } },
        { text: "E. Send the person a private message during the discussion pointing out the error.", traits: { Practicality: 2, Empathy: 1 } },
        { text: "F. Let the discussion conclude and raise it during the debrief.", traits: { Practicality: 1, Teamwork: 1 } },
        { text: "G. Let it go entirely. One factual error in a group discussion rarely causes permanent harm.", traits: { Integrity: -1, Reasoning: -1 } }
      ]
    },
    {
      category: "Advocacy", time: 20,
      text: "Senior leadership publicly praised a piece of work your team produced. In their remarks, they credited one reviewer fully — the more senior of two people who reviewed it. The second reviewer's contribution was actually bigger, but they were not mentioned. The credited senior reviewer sat through the praise and said nothing. You are the author.",
      options: [
        { text: "A. Say nothing. It's the senior reviewer's place to correct the record if they choose. It is not yours.", traits: { Courage: -1, Responsibility: -1 } },
        { text: "B. Speak up in the room: 'I'd like to make sure we're recognizing all contributions here.'", traits: { Courage: 2, Leadership: 2 } },
        { text: "C. Approach the senior reviewer privately afterward and ask them to correct the record themselves.", traits: { Practicality: 2, Social_Adaptability: 1 } },
        { text: "D. Email senior leadership after the meeting to explicitly credit the overlooked reviewer.", traits: { Integrity: 2, Social_Adaptability: -1 } },
        { text: "E. Thank the uncredited reviewer privately and let them know you noticed and appreciated their work.", traits: { Empathy: 2, Courage: -1 } },
        { text: "F. Mention it in the team channel — acknowledge all contributors openly without making it a confrontation.", traits: { Social_Adaptability: 2, Leadership: 1 } },
        { text: "G. Let it pass. Raising it now will look forced and may embarrass the uncredited person further.", traits: { Practicality: 1, Courage: -1 } }
      ]
    },
    {
      category: "Upward Courage", time: 20,
      text: "Your immediate supervisor — someone who has supported and invested in your career — has been making noticeably poor decisions for two months. Work quality has declined. The team has quietly covered for them without discussion. You suspect something serious may be affecting them personally, but you don't know what.",
      options: [
        { text: "A. Continue covering for them. It could be temporary, and loyalty to someone who supported you matters.", traits: { Empathy: 1, Responsibility: -2 } },
        { text: "B. Speak privately and directly to your supervisor — express your genuine concern as a person, not as a junior staff member.", traits: { Leadership: 2, Empathy: 3, Courage: 2 } },
        { text: "C. Escalate to their superior. The team's performance and the institution's interests are at risk.", traits: { Responsibility: 2, Loyalty: -2 } },
        { text: "D. Speak to a trusted colleague first to confirm whether they've observed the same pattern.", traits: { Reasoning: 1, Courage: -1 } },
        { text: "E. Begin writing down the decisions and their impacts without escalating — build evidence before acting.", traits: { Practicality: 2, Teamwork: -1 } },
        { text: "F. Seek HR guidance privately about the appropriate course of action.", traits: { Practicality: 1, Responsibility: 1 } },
        { text: "G. Speak to your supervisor privately and, if appropriate, suggest they consider taking a temporary leave.", traits: { Leadership: 3, Courage: 2 } },
        { text: "H. Do nothing. If this becomes a serious institutional problem, someone more senior will address it.", traits: { Initiative: -2, Responsibility: -2 } }
      ]
    },
    {
      category: "Social Responsibility", time: 20,
      text: "You are alone at a public transport stop at 11 PM. A stranger is verbally aggressive toward a woman standing nearby. The aggression is getting worse but has not become physical. The woman looks frightened and frozen. You are the only other person present. Getting physically involved carries real personal risk.",
      options: [
        { text: "A. Step in verbally and directly — move toward the situation, address the aggressor, position yourself near the woman.", traits: { Courage: 3, Practicality: -1 } },
        { text: "B. Do not intervene. You don't know the relationship, the context, or what might make things worse.", traits: { Courage: -2, Practicality: 1 } },
        { text: "C. Call emergency services immediately, describe the situation, and stay on the line without approaching.", traits: { Practicality: 2, Courage: -1 } },
        { text: "D. Call emergency services while moving closer — make yourself visible to both people without direct confrontation.", traits: { Practicality: 3, Reasoning: 2, Courage: 1 } },
        { text: "E. Address the woman directly: 'Are you okay? Do you know this person?' — a simple check-in that changes the situation.", traits: { Social_Adaptability: 3, Courage: 2 } },
        { text: "F. Create a distraction — make a noise, ask an unrelated question of the aggressor — without direct confrontation.", traits: { Reasoning: 2, Social_Adaptability: 2 } },
        { text: "G. Leave the area quickly and report the incident once you're somewhere safe.", traits: { Courage: -2, Responsibility: 1 } },
        { text: "H. Make it appear you are on the phone with someone — create the impression of a witness being watched.", traits: { Reasoning: 2, Practicality: 1 } }
      ]
    },
    {
      category: "Honesty", time: 20,
      text: "You are interviewing for a role you genuinely want and are otherwise well-qualified for. The interviewer asks about your experience with a specific technical skill. Your actual exposure to it is limited — perhaps a few days of use. Exaggerating would significantly help your chances. You are confident you could learn it quickly.",
      options: [
        { text: "A. State your experience accurately and let the result be what it is. If the skill is a dealbreaker, this was never the right fit.", traits: { Integrity: 3, Confidence: 1 } },
        { text: "B. Exaggerate reasonably — you'll close the gap before it matters.", traits: { Integrity: -2, Practicality: 1 } },
        { text: "C. State you have basic working knowledge and invite them to ask specific questions — let the conversation find its own level.", traits: { Social_Adaptability: 2, Integrity: 1 } },
        { text: "D. Acknowledge the gap but pivot to related skills that show your ability to learn this one quickly.", traits: { Reasoning: 2, Practicality: 2, Integrity: 2 } },
        { text: "E. Honestly acknowledge the gap, state what it is exactly, and explain what you've already done to begin addressing it.", traits: { Integrity: 3, Initiative: 2 } },
        { text: "F. Ask the interviewer how central that skill is to the role before deciding how to describe your experience.", traits: { Practicality: 2, Reasoning: 1 } }
      ]
    },
    {
      category: "Institutional Integrity", time: 20,
      text: "You have become aware of a minor unfair practice that has been part of your institution for years. It was not created by any single person — it grew gradually and continues because everyone quietly ignores it. It causes no serious harm to any individual but consistently puts a specific group at a disadvantage in small, accumulated ways. Raising it formally will likely result in ongoing social and career problems for you.",
      options: [
        { text: "A. Stay quiet. This is not your problem to solve, and the personal cost is real.", traits: { Courage: -2, Integrity: -1 } },
        { text: "B. Raise it formally through official channels immediately, accepting the consequences.", traits: { Courage: 3, Integrity: 3, Practicality: -1 } },
        { text: "C. Raise it anonymously through whatever channel allows that — minimize personal exposure.", traits: { Practicality: 2, Courage: -1 } },
        { text: "D. Speak privately with a small group of trusted peers first to see whether others share your concern.", traits: { Leadership: 2, Social_Adaptability: 1 } },
        { text: "E. Carefully document the pattern over weeks or months before deciding to act — be certain before you risk your reputation.", traits: { Reasoning: 2, Organizing: 2 } },
        { text: "F. Bring it to one senior person you trust and let them decide whether and how to act.", traits: { Practicality: 1, Leadership: -1 } },
        { text: "G. Organize — find others who feel the same way and raise it together rather than alone.", traits: { Leadership: 3, Organizing: 2 } },
        { text: "H. Raise it in a public forum where outside visibility creates pressure on the institution to respond.", traits: { Courage: 2, Social_Adaptability: -2 } }
      ]
    },
    {
      category: "Personal Integrity", time: 20,
      text: "You are working toward a certification that requires completing 30 hours of structured learning. Due to your prior experience, you could pass the assessment comfortably with perhaps 15 hours of preparation. The remaining 15 hours feel unnecessary to you specifically. Completion of the hours is based on your own reporting and cannot be checked.",
      options: [
        { text: "A. Complete all 30 hours. You committed to the requirement and self-reporting is still a commitment.", traits: { Integrity: 3, Determination: 2 } },
        { text: "B. Do the 15 hours you genuinely need. Pointless repetition isn't integrity — it's just box-checking.", traits: { Practicality: 2, Integrity: -1 } },
        { text: "C. Do more than 15 but less than 30 — put in real time without creating unnecessary work.", traits: { Reasoning: 1, Integrity: -1 } },
        { text: "D. Complete all 30 hours and use the extra time to help others who are struggling with the material.", traits: { Leadership: 2, Empathy: 2, Integrity: 2 } },
        { text: "E. Reach out to the certifying body and ask if prior experience can be formally credited toward the hours.", traits: { Practicality: 3, Integrity: 2 } },
        { text: "F. Complete the assessment and report 30 hours. The real purpose of the requirement is competence, not hour-counting.", traits: { Integrity: -2, Practicality: 1 } }
      ]
    },
    {
      category: "Upward Communication", time: 20,
      text: "A senior colleague has been put in charge of a project that is clearly beyond their current ability. You can see this. Others can see this. But no one has said it — because the colleague is enthusiastic, well-liked, and the appointment was made by leadership. The project is six weeks away from public delivery.",
      options: [
        { text: "A. Say nothing. They were selected by people with more information than you. Trust the process.", traits: { Responsibility: -2, Courage: -1 } },
        { text: "B. Offer to be an active support — commit to working closely alongside them, bridging the gap yourself.", traits: { Teamwork: 3, Leadership: 1 } },
        { text: "C. Speak directly to the colleague privately — without naming the concern about their ability, offer specific help where you see gaps.", traits: { Empathy: 2, Practicality: 2 } },
        { text: "D. Speak to the leader who made the appointment and raise your concerns directly.", traits: { Courage: 2, Responsibility: 2, Teamwork: -1 } },
        { text: "E. Raise it with the colleague directly and honestly — including the concern itself — and offer a way forward together.", traits: { Courage: 2, Leadership: 2, Integrity: 2 } },
        { text: "F. Wait two weeks and reassess. If it's as bad as you think, the evidence will be clearer and your step-in more justified.", traits: { Reasoning: 1, Practicality: 1 } },
        { text: "G. Find a way to informally expand your own role in the project to provide a safety net without formally flagging the problem.", traits: { Practicality: 2, Initiative: 2 } }
      ]
    },
    {
      category: "Self-Interest vs. Fairness", time: 20,
      text: "A highly competitive opportunity has one remaining slot. You have applied and are qualified. You learn — through a casual conversation — that another applicant, equally qualified, was not informed of a key document requirement and their application is now officially incomplete. The deadline passed yesterday. They do not know. Telling them would almost certainly allow them to appeal successfully, potentially displacing you.",
      options: [
        { text: "A. Say nothing. You followed the process correctly. The oversight was theirs to manage.", traits: { Practicality: 2, Empathy: -1 } },
        { text: "B. Tell them immediately and help them understand how to appeal.", traits: { Integrity: 3, Courage: 2, Empathy: 2 } },
        { text: "C. Tell them you heard there was a document issue — without giving them specific enough information to act on.", traits: { Integrity: -1, Practicality: 1 } },
        { text: "D. Tip them off anonymously through a channel that doesn't reveal you as the source.", traits: { Practicality: 2, Courage: -1 } },
        { text: "E. Report the issue to the selection authority and let them decide what to do — don't tell the applicant directly.", traits: { Responsibility: 2, Integrity: 1 } },
        { text: "F. Consider how important this opportunity is to you personally before deciding. If this is a critical career step, you have more reason to stay silent.", traits: { Reasoning: 2, Integrity: -1 } }
      ]
    },
    {
      category: "Resistance to Social Pressure", time: 20,
      text: "A project has failed. The group has quietly agreed — without any real evidence — on blaming a specific team member who was relatively quiet and less liked. You don't believe the blame is fair. The person being blamed is not present. The group is moving toward officially recording this version of events in the after-action report.",
      options: [
        { text: "A. Go along. Group agreement exists for a reason and you may be missing something.", traits: { Courage: -2, Integrity: -2 } },
        { text: "B. Speak up immediately: 'I don't think we've established that's actually what happened.'", traits: { Courage: 3, Integrity: 2 } },
        { text: "C. Ask a specific question that challenges the evidence: 'What exactly are we basing this on?'", traits: { Reasoning: 2, Social_Adaptability: 2 } },
        { text: "D. Say nothing in the group but speak to the report author privately before it's finalized.", traits: { Practicality: 2, Courage: -1 } },
        { text: "E. Refuse to sign off on the report if the blame stands without evidence.", traits: { Integrity: 3, Teamwork: -1 } },
        { text: "F. Contact the absent team member privately and inform them of what's being written.", traits: { Empathy: 2, Practicality: -1 } },
        { text: "G. Ask that the after-action report focus on system-level causes rather than individual blame — frame it as a process improvement.", traits: { Leadership: 3, Reasoning: 2 } }
      ]
    },
    {
      category: "Long-Term Independence", time: 20,
      text: "A senior and influential person in your field goes significantly out of their way to help you — not because you asked, but because they chose to. You are deeply grateful. Weeks later, they make a request of you that sits in a morally unclear area — not clearly wrong, but not something you would agree to from someone else. You feel the request may be connected to the earlier favor.",
      options: [
        { text: "A. Comply. They helped you when they didn't have to. This is how relationships work.", traits: { Integrity: -2, Practicality: 1 } },
        { text: "B. Decline the request as you would from anyone else. Gratitude should not affect your ethical judgment.", traits: { Integrity: 3, Courage: 2 } },
        { text: "C. Ask the person directly whether the favor and the request are connected — bring it up openly.", traits: { Courage: 2, Social_Adaptability: -1 } },
        { text: "D. Comply this once and privately decide that this will not repeat.", traits: { Integrity: -1, Practicality: 1 } },
        { text: "E. Express genuine gratitude for the earlier help while declining this specific request and explaining why.", traits: { Leadership: 2, Social_Adaptability: 2, Integrity: 2 } },
        { text: "F. Seek advice from a trusted third party before responding.", traits: { Reasoning: 1, Confidence: -1 } },
        { text: "G. Comply with the part of the request you find acceptable — and explain your limits on the rest.", traits: { Practicality: 2, Reasoning: 1 } }
      ]
    },
    {
      category: "Speed of Decision & Attention",
      type: "shapeReflex",
      text: "Shape Reflex Test: Instant shape identification under time pressure. This test measures your quick decision speed and sustained attention. Press F for circles, J for squares. Focus and respond as quickly and accurately as possible.",
      instructions: "You control when the test starts. Click 'Start Reflex Test' when ready. Respond to each shape by pressing F (circle) or J (square) on your keyboard, or tap the buttons on mobile.",
      options: []
    }
  ];

  /* ====================================================
     OLQ META — Interpretations & SWOT per quality
  ==================================================== */
  const OLQ_META = {
    "Effective Intelligence": {
      group: "Cognitive", weight: 1.0,
      low:  { interp: "Struggles to turn book knowledge into practical action under pressure; analysis is usually shallow.", action: "Work through 3 timed real-world case studies weekly; apply SWOT analysis to every major decision." },
      mod:  { interp: "Demonstrates adequate reasoning but occasionally misses practical solutions when the situation is unfamiliar.", action: "Practice creative thinking puzzles and daily analysis of news events to identify root causes." },
      high: { interp: "Converts complex, unclear information into workable decisions with high accuracy under time pressure.", action: "Mentor peers in structured problem-solving; take on advisory roles in cross-functional planning." },
      swot: {
        s: "Converts theoretical knowledge into practical, field-applicable decisions under time pressure",
        w: "Struggles to turn classroom knowledge into immediate action in new situations",
        o: "Targeted case-study work can sharpen applied reasoning within 3–6 months",
        t: "Intelligence without application reads as academic in SSB — assessors will notice and penalize it"
      }
    },
    "Reasoning Ability": {
      group: "Cognitive", weight: 1.0,
      low:  { interp: "Jumps to the first available conclusion; logical gaps show up under time pressure and conflicting information.", action: "Begin daily structured debate analysis; practice identifying logical gaps in arguments." },
      mod:  { interp: "Reasons logically in familiar territory but gets confused when multiple factors conflict at the same time.", action: "Analyze complex case studies step by step — force yourself to map all factors before deciding." },
      high: { interp: "Breaks down unclear situations with clear thinking, finding key factors others miss.", action: "Mentor peers in analytical tasks; write structured arguments on debatable topics to sharpen precision." },
      swot: {
        s: "Breaks down unclear problems step by step and avoids assumption-driven errors under pressure",
        w: "Jumps to the first available conclusion; logical gaps emerge when information is missing",
        o: "Regular debate and case-analysis practice accelerates this quality measurably within weeks",
        t: "Weak reasoning is the most visible OLQ gap during GTO discussions and personal interviews"
      }
    },
    "Organizing Ability": {
      group: "Cognitive", weight: 1.0,
      low:  { interp: "Task assignment is unplanned; plans break down predictably when variables change or resources are limited.", action: "Create strict daily timelines with dependencies mapped; review every failed plan afterward." },
      mod:  { interp: "Can organize basic tasks but struggles to maintain structure when resources are limited.", action: "Manage a real-world event or team project with multiple moving parts under a fixed deadline." },
      high: { interp: "Structures complex, multi-person tasks into clear sequences under chaotic conditions with minimal friction.", action: "Lead logistics planning for complex situations; develop backup plans for high-stakes projects." },
      swot: {
        s: "Structures complex, multi-person tasks into clear plans under chaotic, resource-limited conditions",
        w: "Task assignment is unplanned; plans break down when variables change or unexpected limits appear",
        o: "Leading real logistics roles builds this rapidly — even event planning develops critical organizing habits",
        t: "Poor organization in command positions creates a chain reaction — teams fail through their leader, not despite them"
      }
    },
    "Social Adaptability": {
      group: "Interpersonal", weight: 1.1,
      low:  { interp: "Appears rigid or withdrawn in new group settings; falls back on the same approach when the social setting is unfamiliar.", action: "Force weekly interaction with completely unfamiliar groups; actively join communities outside your usual sphere." },
      mod:  { interp: "Adapts slowly and shows hesitation at first; takes longer to build a connection under pressure.", action: "Take on networking challenges in unfamiliar professional settings; practice meeting new people cold." },
      high: { interp: "Immediately builds trust and fits into diverse teams regardless of rank or social background.", action: "Mediate group conflicts; take on roles that connect people from different backgrounds; lead integration activities for new team members." },
      swot: {
        s: "Immediately builds trust with unfamiliar groups across social ranks and different backgrounds",
        w: "Falls back on usual approaches; appears cold or awkward in new group settings under observation",
        o: "Cross-cultural exposure and deliberate networking can transform this quality within a few months",
        t: "Low social adaptability is the leading reason technically strong candidates fail SSB selection"
      }
    },
    "Cooperation": {
      group: "Interpersonal", weight: 1.0,
      low:  { interp: "Operates too independently; frequently misses signals that require group coordination or shared credit.", action: "Join a team sport or collaborative creative project where individual contribution is not visible in the final output." },
      mod:  { interp: "Cooperates when necessary but shows a visible preference for working alone and taking individual credit.", action: "Volunteer specifically for group deliverables; practice sharing credit openly even when not required." },
      high: { interp: "Consistently puts team success over personal recognition; multiplies the team's overall strength.", action: "Act as facilitator in group tasks; specifically help underperforming peers rather than outpacing them alone." },
      swot: {
        s: "Consistently puts team success over personal credit — a natural force that multiplies the team's strength",
        w: "Operates independently; misses group coordination signals and tends to outpace rather than support the team",
        o: "Team sports and collaborative project work develop this efficiently — the habits transfer to SSB group tasks",
        t: "SSB assessors specifically watch for candidates who 'take over the group' rather than work genuinely within it"
      }
    },
    "Sense of Responsibility": {
      group: "Command", weight: 1.2,
      low:  { interp: "Passes accountability onto circumstances or colleagues when outcomes are negative; avoids owning failure.", action: "Begin an accountability journal — write down every decision and its outcome without blaming external factors." },
      mod:  { interp: "Takes responsibility for own actions but avoids accepting team-level blame when things go wrong.", action: "Actively take charge of group deliverables and own the outcome regardless of who contributed what." },
      high: { interp: "Fully owns outcomes — including team failures — and protects junior members from being blamed when warranted.", action: "Handle high-stakes deadlines independently; volunteer to lead projects where the outcome is publicly visible." },
      swot: {
        s: "Owns outcomes fully — including failures — without passing blame to circumstances or colleagues",
        w: "Passes accountability onto circumstances or colleagues when under pressure; avoids team-level ownership of failures",
        o: "Owning high-stakes deliverables in real-world settings builds this character trait most efficiently",
        t: "Low responsibility scores are the clearest predictor of failure in command positions — SSB assessors prioritize this"
      }
    },
    "Initiative": {
      group: "Command", weight: 1.2,
      low:  { interp: "Waits for clear direction; rarely the first to act in unclear situations even when action is clearly needed.", action: "Set a rule: speak first in every meeting for one week; volunteer for every task before being asked." },
      mod:  { interp: "Takes initiative in familiar situations but hesitates when the context is new or when there is a visible social cost.", action: "Volunteer specifically for tasks outside your comfort zone; make being first a practiced habit, not an instinct." },
      high: { interp: "Identifies problems before being told and acts without waiting for permission when the situation is clear; takes charge of gaps proactively.", action: "Start a new project that nobody asked you to; design the solution to a problem you noticed before it became visible to others." },
      swot: {
        s: "Identifies problems before being told and acts without waiting for permission when the situation is clear",
        w: "Waits for direction; rarely the first to act in unclear situations — becomes invisible in GTO group tasks",
        o: "Daily practice of acting first — even in small, low-stakes situations — builds this habit quickly",
        t: "Passive candidates are invisible in GTO and group tasks — even strong thinkers are filtered out here"
      }
    },
    "Self Confidence": {
      group: "Command", weight: 1.1,
      low:  { interp: "Second-guesses decisions visibly when opposed; calmness breaks down under pressure or public attention.", action: "Practice public speaking weekly; face challenging questions head-on; compete in debate formats." },
      mod:  { interp: "Confident in routine tasks but visibly shaken by sudden challenges or strong peer opposition.", action: "Perform tasks under artificial time pressure daily; defend unpopular viewpoints in front of a challenging audience." },
      high: { interp: "Projects certainty under pressure; maintains calmness when opposed, which earns group support and assessor attention.", action: "Seek out challenging environments; practice holding your position under continuous pressure without becoming defensive." },
      swot: {
        s: "Projects certainty under pressure, which earns group support and assessor attention at critical moments",
        w: "Visibly second-guesses decisions when opposed; appears uncertain precisely at the critical moment",
        o: "Controlled exposure to challenging environments rapidly builds genuine (not performed) confidence",
        t: "Confidence gaps are clearly visible in the personal interview and command tasks — assessors probe specifically for this"
      }
    },
    "Speed of Decision": {
      group: "Command", weight: 1.1,
      low:  { interp: "Overthinks and freezes at critical moments; keeps looking for more information well past the point where action is needed.", action: "Set strict 30-second decision timers daily for low-stakes choices; build comfort with acting on incomplete information." },
      mod:  { interp: "Decides reasonably well under normal conditions but hesitates significantly when information is missing or conflicting.", action: "Play fast-paced strategy games under time pressure; practice 'good enough' decision approaches for time-critical situations." },
      high: { interp: "Processes incomplete information and commits to action while others are still assessing; decisions are consistently accurate.", action: "Practice crisis simulation exercises; volunteer for roles that require quick adjustment under changing conditions." },
      swot: {
        s: "Processes incomplete information and commits to action while others are still assessing the situation",
        w: "Overthinks under time pressure; freezes at critical moments in group tasks when the social cost of error is visible",
        o: "Time-limited decision simulations over 6 weeks can measurably improve decision speed and accuracy",
        t: "The SSB environment is designed to expose exactly this gap — there is no 'time to think' in real testing"
      }
    },
    "Ability to Influence": {
      group: "Interpersonal", weight: 1.0,
      low:  { interp: "Arguments are logically sound but don't seem to connect with people; frequently overruled in group discussions without understanding why.", action: "Study persuasion and negotiation methods (such as SPAR and Socratic questioning); practice framing arguments for different audiences." },
      mod:  { interp: "Can influence through logic but lacks the strong, commanding presence needed to shift group agreement under pressure.", action: "Lead group discussions actively; practice using story and evidence together rather than pure argument." },
      high: { interp: "Shifts group agreement through credibility, framing, and timing — not by asserting authority; disagreements become realignments.", action: "Take up formal leadership or advisory roles; resolve conflicts between opposing parties; practice structured negotiation." },
      swot: {
        s: "Shifts group agreement through credibility and framing, not assertion of authority — disagreements become realignments",
        w: "Arguments are logical but don't land with people; often overruled in group discussions without understanding why",
        o: "Studying persuasion methods (such as SPAR and Socratic questioning) can shift this quality within months",
        t: "Without influence, leadership remains intention only — candidates who can't move groups don't get selected"
      }
    },
    "Liveliness": {
      group: "Interpersonal", weight: 0.9,
      low:  { interp: "Overly serious manner appears as anxiety or rigidity to assessors; provides little in the way of team energy or morale.", action: "Engage in social, sports, or performance activities weekly; practice bringing energy into low-stakes group situations." },
      mod:  { interp: "Pleasant and engaged but not a main source of team energy; group morale doesn't rise or fall with your presence.", action: "Consciously bring optimism and lightness and humor during stressful tasks; create group habits that reset energy between efforts." },
      high: { interp: "Keeps team morale going under sustained stress; energizes rather than drains the group; assessors observe this across all five days.", action: "Lead morale-boosting activities; take on the 'group spirit' role deliberately during long-duration exercises." },
      swot: {
        s: "Keeps team morale going under sustained stress; energizes rather than drains the group across all five SSB days",
        w: "Overly serious manner appears as anxiety to assessors; reduces group cohesion in ways the candidate doesn't notice",
        o: "Participation in social, sports, or performance activities builds this naturally over weeks",
        t: "Low liveliness gets worse under multi-day SSB stress — assessors observe energy management across all five days"
      }
    },
    "Determination": {
      group: "Command", weight: 1.1,
      low:  { interp: "Effort and focus drop after initial resistance; the quitting point is too early for sustained military-grade demands.", action: "Start endurance sports immediately; set goals that require 30+ days of consistent effort to complete." },
      mod:  { interp: "Determined in short bursts but drops during long or thankless challenges where effort is not visibly rewarded.", action: "Set and track long-term difficult goals with no external accountability; practice finishing what you start under resistance." },
      high: { interp: "Maintains quality of effort through sustained difficulties without external motivation; does not visibly quit when unobserved.", action: "Take on high-difficulty challenges where many people quit; pursue projects where the chance of failure is high and completion alone is the reward." },
      swot: {
        s: "Maintains quality of effort through sustained difficulties without external motivation — does not quit when unobserved",
        w: "Effort and focus drop after initial resistance; the quitting point is too early for SSB's demands",
        o: "Endurance training — both physical and mental — directly builds this quality in measurable ways",
        t: "SSB selects for sustained performance across five days — early quitters are easily identified and filtered"
      }
    },
    "Courage": {
      group: "Command", weight: 1.3,
      low:  { interp: "Avoids physical and moral risks entirely; prioritizes personal safety or social comfort over necessary action with visible consistency.", action: "Take calculated physical or social risks weekly; deliberately put yourself in situations requiring the uncomfortable first step." },
      mod:  { interp: "Shows courage when forced by circumstances, but prefers safety when there is a choice available; comfort zone is too wide.", action: "Speak up against the majority in at least one discussion per week; take the uncomfortable position on purpose." },
      high: { interp: "Takes calculated physical and moral risks to achieve objectives; acts decisively when the cost of inaction is clear.", action: "Lead high-risk crisis response situations; specifically seek situations where the courageous choice has a visible social cost." },
      swot: {
        s: "Takes calculated physical and moral risks; acts decisively when the cost of inaction is clearly visible",
        w: "Avoids risk entirely; prioritizes personal safety or social comfort over necessary action with visible consistency",
        o: "Regular exposure to social and physical discomfort progressively raises the courage threshold permanently",
        t: "Cowardice in moral dilemmas is a disqualifying pattern; SSB assessors are specifically trained to detect it"
      }
    },
    "Emotional Stability": {
      group: "Interpersonal", weight: 1.2,
      low:  { interp: "Emotional states visibly affect decision quality; stress produces reactive rather than deliberate responses under observation.", action: "Practice pause-response control: build a 3-second gap between a trigger and your response in every difficult interaction." },
      mod:  { interp: "Generally calm but pressure affects consistency; calmness is maintained in familiar situations but breaks under new ones.", action: "Expose yourself to controlled stress simulations; practice maintaining a neutral expression during challenging questioning." },
      high: { interp: "Maintains mental and behavioral stability across stressful situations; calmness is real, not acted, and holds under sustained pressure.", action: "Train for command-level decision making under physical tiredness; seek multi-day challenges that test emotional endurance." },
      swot: {
        s: "Maintains mental and behavioral stability across stressful situations — calmness is real, not acted",
        w: "Emotional states visibly affect decision quality; stress produces reactive rather than deliberate responses",
        o: "Mindfulness, pressure training, and self-awareness work can systematically build this quality over months",
        t: "Emotional instability in command situations puts both team and mission at risk — assessors weight this heavily"
      }
    },
    "Integrity": {
      group: "Command", weight: 1.5,
      low:  { interp: "Values bend under social or professional pressure; chooses comfort, career, or social standing over ethical consistency.", action: "Maintain an integrity journal — record every decision where a value was at stake and whether you held or gave in." },
      mod:  { interp: "Generally honest and ethical but hesitates when consequences are high or the social cost of honesty is visible.", action: "Practice complete and honest behavior in small things; build the habit of the uncomfortable true statement before the high-stakes moment." },
      high: { interp: "Ethical behavior is consistent regardless of cost or observation; the moral compass is internal, not social or situational.", action: "Mentor others on moral courage; deliberately seek situations where the morally correct choice has a real personal cost." },
      swot: {
        s: "Ethical behavior is consistent regardless of cost or observation — the moral compass is internal, not social",
        w: "Values bend under social or professional pressure; chooses comfort or career over ethical consistency",
        o: "Developing the habit of small, consistent honest acts creates an unshakeable integrity foundation over time",
        t: "Integrity failures are effectively non-recoverable in SSB — one observed incident ends a candidacy"
      }
    },
    "Leadership": {
      group: "Command", weight: 1.5,
      low:  { interp: "Shrinks from taking charge; prefers execution over command even when leadership is clearly required and no one else steps up.", action: "Volunteer to lead every group presentation, event, or task for the next 30 days — build the leadership habit deliberately." },
      mod:  { interp: "Leads by example effectively but struggles to direct others firmly or take formal command in unclear situations.", action: "Study delegation and assertive communication; practice giving direct, specific instructions without softening or holding back." },
      high: { interp: "Naturally takes charge in unclear situations; team defers without being told to; earns authority through skill.", action: "Take command in chaotic situations; seek roles where the cost of leadership failure is real and visible." },
      swot: {
        s: "Naturally takes charge in unclear situations; team defers without being asked — authority earned through skill",
        w: "Avoids stepping forward; prefers execution over command even when leadership is clearly needed",
        o: "Formal leadership roles — even small ones — provide the confidence and experience to grow this rapidly",
        t: "Leadership is the highest-weighted OLQ. Moderate scores require exceptional performance everywhere else to compensate"
      }
    }
  };

  /* ====================================================
     ARCHETYPE DEFINITIONS
  ==================================================== */
  const ARCHETYPES = [
    {
      name: "Strategic Commander",
      match: (top) => top.includes("Leadership") && top.includes("Reasoning Ability"),
      summary: "You combine deep analytical thinking with natural leadership authority. You read complex situations quickly, build clear plans, and execute through people — not around them. Your greatest risk is overthinking when speed is the mission requirement.",
      badge: "Command Track"
    },
    {
      name: "Ethical Guardian",
      match: (top) => top.includes("Integrity") && top.includes("Courage"),
      summary: "Your moral compass is your most powerful asset. You hold your ground under social and institutional pressure, and your consistency builds a level of trust that tactical skills alone cannot create. Your challenge is turning your ethical beliefs into effective action.",
      badge: "High Integrity"
    },
    {
      name: "Crisis Leader",
      match: (top) => top.includes("Courage") && top.includes("Speed of Decision") && top.includes("Initiative"),
      summary: "You thrive precisely where others freeze. In the first thirty seconds of a crisis, you're already moving — gathering information, directing people, and keeping things moving forward. Your risk is acting too quickly without thinking when careful thought would serve better.",
      badge: "High Pressure"
    },
    {
      name: "Calm Tactician",
      match: (top) => top.includes("Emotional Stability") && top.includes("Reasoning Ability"),
      summary: "Exceptional calmness under pressure combined with strong analytical ability makes you a precise and effective person in high-stakes situations. You don't panic, which means others don't panic. Your development area is turning your clear thinking into visible leadership presence.",
      badge: "Stable Under Fire"
    },
    {
      name: "Adaptive Influencer",
      match: (top) => top.includes("Social Adaptability") && top.includes("Ability to Influence"),
      summary: "You move through social and institutional structures with unusual ease. You read situations, adjust your communication style, and guide group agreement without pushing it. The risk: your flexibility may appear as inconsistency to assessors who look for a consistent set of values.",
      badge: "Social Intelligence"
    },
    {
      name: "Team Sentinel",
      match: (top) => top.includes("Cooperation") && top.includes("Sense of Responsibility"),
      summary: "You are the one who holds everything together — ensuring commitments are met, credit is shared, and no one is left behind. You produce results through reliability and accountability. Your challenge is stepping forward clearly when the situation demands individual leadership.",
      badge: "Team-Centric"
    },
    {
      name: "Resolute Executor",
      match: (top) => top.includes("Determination") && top.includes("Sense of Responsibility"),
      summary: "You finish what you start, regardless of how difficult or thankless the final stretch becomes. You own outcomes in a way that earns respect. Your development challenge is building the social flexibility to lead, not just execute.",
      badge: "High Determination"
    },
    {
      name: "Analytical Strategist",
      match: (top) => top.includes("Reasoning Ability") && top.includes("Organizing Ability"),
      summary: "You are most effective when given time to structure a problem before acting on it. Your planning quality is excellent; your ability to organize under unclear conditions is a genuine advantage. The development gap is speed of execution and visible leadership presence.",
      badge: "Planning Track"
    },
    {
      name: "Principled Operator",
      match: (top) => top.includes("Integrity") && top.includes("Sense of Responsibility") && top.includes("Organizing Ability"),
      summary: "You combine ethical consistency with operational reliability — a combination that produces long-term trust within the organization. You are the person systems depend on. The gap to close is showing that reliability openly rather than quietly.",
      badge: "Character-Led"
    },
    {
      name: "Balanced Officer",
      match: () => true, // fallback
      summary: "You show no dramatic gaps and no single dominant quality — which in SSB terms means you are a stable, reliable candidate whose complete profile will show during multi-day group activities. Focus on ensuring your highest qualities are visible rather than assumed.",
      badge: "Broad Profile"
    }
  ];

  /* ====================================================
     STATE MANAGEMENT
  ==================================================== */
  let currentQ = 0;
  let timerHandle;
  let timeLeft = 0;
  let totalTimeForQ = 0;
  let responseTimes = [];
  let candidateData = {
    name: 'Cadet',
    targetBoard: 'NDA/CDS',
    batchNo: 'DOSPDP-2026',
    testDate: '',
    selfRatings: {
      english: 0,
      groupSpeaking: 0,
      oneToOne: 0,
      discipline: 0,
      selfAwareness: 0
    },
    reflections: {
      routine: { val: 'Yes', text: '' },
      strengths: { val: 'Yes', text: '' },
      weakness: { val: 'Yes', text: '' },
      contribution: { val: 'Yes', text: '' }
    }
  };

  let scores = {
    Courage: 0, Practicality: 0, Leadership: 0, Initiative: 0,
    Responsibility: 0, Emotional_Stability: 0, Integrity: 0,
    Reasoning: 0, Teamwork: 0, Social_Adaptability: 0,
    Organizing: 0, Confidence: 0, Influence: 0, Determination: 0,
    Communication: 0, Adaptability: 0, Empathy: 0,
    Transparency: 0, Loyalty: 0
  };

  /* ====================================================
     SCORE HELPERS & NORMALIZATION
  ==================================================== */
  function normOLQ(raw) {
    // Maps raw score range ~[-8, +20] → [0, 100]
    return Math.max(0, Math.min(100, Math.round(((raw + 8) / 28) * 100)));
  }

  function getTier(pct) {
    if (pct >= 82) return { label: 'Exceptional', short: 'EXCEPTIONAL', color: '#10b981', barColor: 'linear-gradient(90deg, #10b981, #34d399)' };
    if (pct >= 65) return { label: 'Strong',      short: 'STRONG',      color: '#3b82f6', barColor: 'linear-gradient(90deg, #3b82f6, #60a5fa)' };
    if (pct >= 48) return { label: 'Developing',  short: 'DEVELOPING',  color: '#f59e0b', barColor: 'linear-gradient(90deg, #f59e0b, #fbbf24)' };
    if (pct >= 30) return { label: 'Needs Work',  short: 'NEEDS WORK',  color: '#ea580c', barColor: 'linear-gradient(90deg, #ea580c, #f97316)' };
    return               { label: 'Critical Gap', short: 'CRITICAL GAP', color: '#ef4444', barColor: 'linear-gradient(90deg, #ef4444, #f87171)' };
  }

  function getReadinessLabel(score) {
    if (score >= 78) return { label: 'Recommended', color: '#10b981', bg: 'rgba(16,185,129,.15)', border: 'rgba(16,185,129,.4)' };
    if (score >= 60) return { label: 'Borderline', color: '#f59e0b', bg: 'rgba(245,158,11,.15)', border: 'rgba(245,158,11,.4)' };
    if (score >= 45) return { label: 'Developing', color: '#ea580c', bg: 'rgba(234,88,12,.15)', border: 'rgba(234,88,12,.4)' };
    return                  { label: 'Not Ready', color: '#ef4444', bg: 'rgba(239,68,68,.15)', border: 'rgba(239,68,68,.4)' };
  }

  /* ====================================================
     SHAPE REFLEX TEST STATE & LOGIC
  ==================================================== */
  let reflexState = {
    running: false,
    currentRound: 0,
    totalRounds: 15,
    correct: 0,
    wrong: 0,
    missed: 0,
    reactionTimes: [],
    currentRule: 'none',
    stimulusStart: 0,
    responded: false,
    lastInputAt: 0,
    stimulusActive: false
  };

  function initShapeReflexContainer() {
    const q = assessmentData[currentQ];
    const container = document.getElementById('shape-reflex-container');
    if (container) container.style.display = 'block';
    
    const optList = document.getElementById('options-list');
    if (optList) optList.innerHTML = '';
    
    const textEl = document.getElementById('scenario-text');
    if (textEl) textEl.innerText = q.text;
    
    const instEl = document.getElementById('reflex-instructions');
    if (instEl) instEl.innerText = q.instructions;
    
    const land = document.getElementById('reflex-landing');
    if (land) land.style.display = 'block';
    
    const test = document.getElementById('reflex-testing');
    if (test) test.style.display = 'none';
    
    const res = document.getElementById('reflex-results');
    if (res) res.style.display = 'none';
  }

  let resolveStimulusRound = null;

  function startShapeReflexTest() {
    const land = document.getElementById('reflex-landing');
    if (land) land.style.display = 'none';
    
    const test = document.getElementById('reflex-testing');
    if (test) test.style.display = 'block';
    
    reflexState = {
      running: true,
      currentRound: 0,
      totalRounds: 15,
      correct: 0,
      wrong: 0,
      missed: 0,
      reactionTimes: [],
      currentRule: 'none',
      stimulusStart: 0,
      responded: false,
      lastInputAt: 0,
      stimulusActive: false
    };
    
    const statEl = document.getElementById('reflex-status');
    if (statEl) statEl.textContent = 'Stay focused on the center box...';
    
    setTimeout(() => runReflexRounds(), 600);
  }

  function handleReflexResponse(key) {
    if (!reflexState.running) return;
    const now = performance.now();
    if (now - reflexState.lastInputAt < 100) return;
    reflexState.lastInputAt = now;
    
    if (reflexState.stimulusActive) {
      if (reflexState.responded) return;
      reflexState.responded = true;
      const reaction = now - reflexState.stimulusStart;
      if (reflexState.currentRule === key.toLowerCase()) {
        reflexState.correct++;
        reflexState.reactionTimes.push(reaction);
      } else {
        reflexState.wrong++;
      }
      if (resolveStimulusRound) {
        resolveStimulusRound();
        resolveStimulusRound = null;
      }
    } else {
      reflexState.wrong++;
    }
  }

  function pickShape() {
    return Math.random() < 0.5 ? 'circle' : 'square';
  }

  function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function waitMs(duration) {
    return new Promise((resolve) => setTimeout(resolve, duration));
  }

  async function runReflexRounds() {
    const shapeRules = { circle: 'f', square: 'j' };
    const statEl = document.getElementById('reflex-status');
    if (statEl) statEl.textContent = 'Stay focused on the center box...';
    
    for (let i = 0; i < reflexState.totalRounds; i++) {
      if (!reflexState.running) break;
      
      // Standby delay at random time interval (500ms - 2200ms)
      const standbyDelay = randomBetween(500, 2200);
      await waitMs(standbyDelay);
      if (!reflexState.running) break;
      
      // Show shape stimulus
      const shape = pickShape();
      reflexState.currentRule = shapeRules[shape];
      reflexState.responded = false;
      reflexState.stimulusActive = true;
      
      const stimulus = document.getElementById('reflex-stimulus');
      if (stimulus) {
        stimulus.classList.remove('circle', 'square', 'show');
        stimulus.classList.add(shape, 'show');
      }
      reflexState.stimulusStart = performance.now();
      
      // Randomized exposure speed (650ms - 1300ms) or until user responds
      const visibleDuration = randomBetween(650, 1300);
      await Promise.race([
        waitMs(visibleDuration),
        new Promise(res => { resolveStimulusRound = res; })
      ]);
      resolveStimulusRound = null;
      
      // Hide stimulus
      if (stimulus) stimulus.classList.remove('show');
      reflexState.stimulusActive = false;
      
      if (!reflexState.responded) {
        reflexState.missed++;
      }

      // Randomized brief inter-stimulus gap
      await waitMs(randomBetween(200, 450));
    }
    
    showReflexResults();
  }

  function showReflexResults() {
    reflexState.running = false;
    const test = document.getElementById('reflex-testing');
    if (test) test.style.display = 'none';
    
    const res = document.getElementById('reflex-results');
    if (res) res.style.display = 'block';
    
    const accuracy = reflexState.totalRounds > 0 ? reflexState.correct / reflexState.totalRounds : 0;
    const avgRt = reflexState.reactionTimes.length > 0 ? reflexState.reactionTimes.reduce((a, b) => a + b) / reflexState.reactionTimes.length : 0;
    const speedIndex = Math.round(Math.max(0, Math.min(100, 150 - (avgRt / 10))));
    
    const accEl = document.getElementById('reflex-accuracy');
    if (accEl) accEl.textContent = Math.round(accuracy * 100) + '%';
    
    const rtEl = document.getElementById('reflex-avg-time');
    if (rtEl) rtEl.textContent = Math.round(avgRt) + ' ms';
    
    const corEl = document.getElementById('reflex-correct');
    if (corEl) corEl.textContent = `${reflexState.correct} / ${reflexState.totalRounds}`;
    
    const spdEl = document.getElementById('reflex-speed-index');
    if (spdEl) spdEl.textContent = speedIndex;
    
    let insight = 'Reflex test completed successfully.';
    if (accuracy >= 0.85 && speedIndex >= 60) {
      insight = 'Exceptional reflex capability! Swift cognitive identification and prompt motor commitment under pressure.';
      scores['Initiative'] = (scores['Initiative'] || 0) + 3;
      scores['Determination'] = (scores['Determination'] || 0) + 2;
      scores['Reasoning'] = (scores['Reasoning'] || 0) + 2;
    } else if (accuracy >= 0.70) {
      insight = 'Solid decision reflexes. Minor hesitation noticed under changing stimulus patterns.';
      scores['Initiative'] = (scores['Initiative'] || 0) + 2;
      scores['Determination'] = (scores['Determination'] || 0) + 1;
    } else {
      insight = 'Decision hesitation detected under time pressure. Focus on instinctive pattern recognition and sustained attention.';
      scores['Initiative'] = (scores['Initiative'] || 0) + 1;
    }
    
    const insEl = document.getElementById('reflex-insight');
    if (insEl) insEl.textContent = insight;
  }

  /* ====================================================
     SPATIAL / WORKING MEMORY GRID TEST STATE & LOGIC (STAGE 2B)
  ==================================================== */
  let memoryState = {
    running: false,
    currentRound: 0,
    totalRounds: 8,
    gridSize: 3, // 3 -> 3x3, 4 -> 4x4, 5 -> 5x5
    targetCount: 3,
    consecutiveSuccess: 0,
    consecutiveFailure: 0,
    clearedRounds: 0,
    totalTargetTiles: 0,
    totalCorrectHits: 0,
    maxGridAchieved: 3,
    currentTargets: new Set(),
    userSelections: new Set(),
    phase: 'idle', // 'idle' | 'memorize' | 'recall' | 'feedback'
    memorizeTimerHandle: null,
    feedbackTimer: null,
    roundsHistory: []
  };

  function continueFromReflexTest() {
    const reflexBox = document.getElementById('shape-reflex-container');
    if (reflexBox) reflexBox.style.display = 'none';

    const scenarioCard = document.querySelector('.scenario-card');
    if (scenarioCard) scenarioCard.style.display = 'none';

    const optList = document.getElementById('options-list');
    if (optList) optList.style.display = 'none';

    // Show Spatial Memory Test Container
    const memoryBox = document.getElementById('spatial-memory-container');
    if (memoryBox) memoryBox.style.display = 'block';

    const memLanding = document.getElementById('memory-landing');
    if (memLanding) memLanding.style.display = 'block';

    const memTesting = document.getElementById('memory-testing');
    if (memTesting) memTesting.style.display = 'none';

    const memResults = document.getElementById('memory-results');
    if (memResults) memResults.style.display = 'none';

    // Update sticky header for stage 2B
    const qCur = document.getElementById('q-current');
    if (qCur) qCur.innerText = 'Stage 2B';
    const qTot = document.getElementById('q-total');
    if (qTot) qTot.innerText = 'Memory Grid';

    const timerWidget = document.querySelector('.timer-widget');
    const timerText = document.getElementById('timer-text');
    if (timerText) timerText.innerText = 'Pattern Recall';
    if (timerWidget) timerWidget.classList.remove('danger');

    const prog = document.getElementById('progress-fill');
    if (prog) prog.style.width = '100%';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function startMemoryTest() {
    const memLanding = document.getElementById('memory-landing');
    if (memLanding) memLanding.style.display = 'none';

    const memResults = document.getElementById('memory-results');
    if (memResults) memResults.style.display = 'none';

    const memTesting = document.getElementById('memory-testing');
    if (memTesting) memTesting.style.display = 'block';

    memoryState = {
      running: true,
      currentRound: 0,
      totalRounds: 8,
      gridSize: 3,
      targetCount: 3,
      consecutiveSuccess: 0,
      consecutiveFailure: 0,
      clearedRounds: 0,
      totalTargetTiles: 0,
      totalCorrectHits: 0,
      maxGridAchieved: 3,
      currentTargets: new Set(),
      userSelections: new Set(),
      phase: 'idle',
      memorizeTimerHandle: null,
      feedbackTimer: null,
      roundsHistory: []
    };

    runNextMemoryRound();
  }

  function calculateMemoryRoundParameters() {
    const roundIdx = memoryState.currentRound; // 0..7
    let size = memoryState.gridSize;
    let targets = memoryState.targetCount;

    if (roundIdx === 0) {
      size = 3;
      targets = 3;
    } else if (roundIdx === 1) {
      if (memoryState.consecutiveSuccess >= 1) {
        size = 3;
        targets = 4;
      } else {
        size = 3;
        targets = 3;
      }
    } else {
      // Rounds 3 to 8 (roundIdx 2..7)
      if (size === 3) {
        if (memoryState.consecutiveSuccess >= 1) {
          // Promote to 4x4
          size = 4;
          targets = 4;
        } else {
          // Stay on 3x3 for more opportunity
          size = 3;
          targets = memoryState.consecutiveFailure >= 2 ? 3 : 4;
        }
      } else if (size === 4) {
        if (memoryState.consecutiveSuccess >= 2 || (targets >= 5 && memoryState.consecutiveSuccess >= 1)) {
          // Promote to 5x5
          size = 5;
          targets = 5;
        } else if (memoryState.consecutiveSuccess >= 1) {
          // Good on 4x4, increment targets
          size = 4;
          targets = Math.min(6, targets + 1);
        } else if (memoryState.consecutiveFailure >= 2) {
          // Give reinforcement on 3x3
          size = 3;
          targets = 4;
        } else {
          // Retry 4x4 with 4 targets
          size = 4;
          targets = 4;
        }
      } else if (size === 5) {
        if (memoryState.consecutiveSuccess >= 1) {
          size = 5;
          targets = Math.min(7, targets + 1);
        } else if (memoryState.consecutiveFailure >= 2) {
          // Fall back to 4x4
          size = 4;
          targets = 5;
        } else {
          // Retry 5x5
          size = 5;
          targets = 5;
        }
      }
    }

    memoryState.gridSize = size;
    memoryState.targetCount = targets;
    memoryState.maxGridAchieved = Math.max(memoryState.maxGridAchieved, size);
  }

  function runNextMemoryRound() {
    if (!memoryState.running) return;
    if (memoryState.currentRound >= memoryState.totalRounds) {
      showMemoryResults();
      return;
    }

    calculateMemoryRoundParameters();

    const size = memoryState.gridSize;
    const targetCount = memoryState.targetCount;
    const totalTiles = size * size;

    // Update status indicators
    const badgeEl = document.getElementById('memory-grid-badge');
    if (badgeEl) badgeEl.innerText = `${size}×${size} Grid`;

    const roundNumEl = document.getElementById('memory-round-num');
    if (roundNumEl) roundNumEl.innerText = `${memoryState.currentRound + 1}`;

    const phaseText = document.getElementById('memory-phase-text');
    if (phaseText) {
      phaseText.innerText = 'Memorize the pattern...';
      phaseText.style.color = '';
    }

    const counterEl = document.getElementById('memory-selection-counter');
    if (counterEl) counterEl.innerText = `Memorize ${targetCount} highlighted squares`;

    // Render Grid
    const gridEl = document.getElementById('memory-matrix-grid');
    if (gridEl) {
      gridEl.innerHTML = '';
      gridEl.className = `memory-matrix grid-${size}x${size}`;

      for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.className = 'memory-tile locked';
        tile.dataset.index = i;
        tile.addEventListener('click', () => handleMemoryTileClick(i, tile));
        gridEl.appendChild(tile);
      }
    }

    // Select random unique targets
    const allIndices = Array.from({ length: totalTiles }, (_, i) => i);
    for (let i = allIndices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allIndices[i], allIndices[j]] = [allIndices[j], allIndices[i]];
    }
    const chosenTargets = allIndices.slice(0, targetCount);
    memoryState.currentTargets = new Set(chosenTargets);
    memoryState.userSelections = new Set();
    memoryState.phase = 'memorize';

    // Highlight target tiles
    chosenTargets.forEach(idx => {
      const t = document.querySelector(`.memory-tile[data-index="${idx}"]`);
      if (t) t.classList.add('tile-active');
    });

    // Determine preview duration based on grid & targets
    const previewDuration = size === 5 ? 3000 : size === 4 ? 2500 : 2000;

    // Animate timer bar
    const timerBar = document.getElementById('memory-timer-bar');
    if (timerBar) {
      timerBar.style.transition = 'none';
      timerBar.style.width = '100%';
    }

    const startTime = performance.now();
    if (memoryState.memorizeTimerHandle) clearInterval(memoryState.memorizeTimerHandle);

    memoryState.memorizeTimerHandle = setInterval(() => {
      if (!memoryState.running) {
        clearInterval(memoryState.memorizeTimerHandle);
        return;
      }
      const elapsed = performance.now() - startTime;
      const remaining = Math.max(0, previewDuration - elapsed);
      const pct = (remaining / previewDuration) * 100;
      if (timerBar) timerBar.style.width = `${pct}%`;

      if (remaining <= 0) {
        clearInterval(memoryState.memorizeTimerHandle);
        memoryState.memorizeTimerHandle = null;
        startRecallPhase();
      }
    }, 20);
  }

  function startRecallPhase() {
    if (!memoryState.running) return;
    memoryState.phase = 'recall';

    // Clear active highlights and unlock tiles
    const allTiles = document.querySelectorAll('.memory-tile');
    allTiles.forEach(t => {
      t.classList.remove('tile-active', 'locked');
    });

    const timerBar = document.getElementById('memory-timer-bar');
    if (timerBar) {
      timerBar.style.transition = 'width 0.2s ease';
      timerBar.style.width = '100%';
    }

    const phaseText = document.getElementById('memory-phase-text');
    if (phaseText) phaseText.innerText = `Recall Phase: Tap the ${memoryState.targetCount} squares`;

    const counterEl = document.getElementById('memory-selection-counter');
    if (counterEl) counterEl.innerText = `Selected: 0 of ${memoryState.targetCount}`;
  }

  function handleMemoryTileClick(tileIndex, tileEl) {
    if (!memoryState.running || memoryState.phase !== 'recall') return;

    if (memoryState.userSelections.has(tileIndex)) {
      memoryState.userSelections.delete(tileIndex);
      tileEl.classList.remove('tile-selected');
    } else {
      if (memoryState.userSelections.size < memoryState.targetCount) {
        memoryState.userSelections.add(tileIndex);
        tileEl.classList.add('tile-selected');
      }
    }

    const countEl = document.getElementById('memory-selection-counter');
    if (countEl) {
      countEl.innerText = `Selected: ${memoryState.userSelections.size} of ${memoryState.targetCount}`;
    }

    if (memoryState.userSelections.size === memoryState.targetCount) {
      evaluateMemoryRound();
    }
  }

  function evaluateMemoryRound() {
    memoryState.phase = 'feedback';

    // Lock tiles
    const tiles = document.querySelectorAll('.memory-tile');
    tiles.forEach(t => t.classList.add('locked'));

    let hits = 0;
    const totalTiles = memoryState.gridSize * memoryState.gridSize;

    for (let i = 0; i < totalTiles; i++) {
      const tile = document.querySelector(`.memory-tile[data-index="${i}"]`);
      if (!tile) continue;

      const isTarget = memoryState.currentTargets.has(i);
      const isSelected = memoryState.userSelections.has(i);

      if (isTarget && isSelected) {
        hits++;
        tile.classList.remove('tile-selected');
        tile.classList.add('tile-correct');
      } else if (isSelected && !isTarget) {
        tile.classList.remove('tile-selected');
        tile.classList.add('tile-wrong');
      } else if (isTarget && !isSelected) {
        tile.classList.add('tile-missed');
      }
    }

    const isSuccess = (hits === memoryState.targetCount);
    memoryState.totalTargetTiles += memoryState.targetCount;
    memoryState.totalCorrectHits += hits;

    const phaseText = document.getElementById('memory-phase-text');
    if (isSuccess) {
      memoryState.clearedRounds++;
      memoryState.consecutiveSuccess++;
      memoryState.consecutiveFailure = 0;
      if (phaseText) {
        phaseText.innerText = '✓ Perfect Recall!';
        phaseText.style.color = '#10b981';
      }
    } else {
      memoryState.consecutiveFailure++;
      memoryState.consecutiveSuccess = 0;
      if (phaseText) {
        phaseText.innerText = `✗ Pattern Missed (${hits}/${memoryState.targetCount} correct)`;
        phaseText.style.color = '#ef4444';
      }
    }

    memoryState.roundsHistory.push({
      round: memoryState.currentRound + 1,
      gridSize: memoryState.gridSize,
      targetCount: memoryState.targetCount,
      hits,
      success: isSuccess
    });

    if (memoryState.feedbackTimer) clearTimeout(memoryState.feedbackTimer);
    memoryState.feedbackTimer = setTimeout(() => {
      if (phaseText) phaseText.style.color = '';
      memoryState.currentRound++;
      if (memoryState.currentRound < memoryState.totalRounds) {
        runNextMemoryRound();
      } else {
        showMemoryResults();
      }
    }, 1200);
  }

  function showMemoryResults() {
    memoryState.running = false;
    const testEl = document.getElementById('memory-testing');
    if (testEl) testEl.style.display = 'none';

    const resEl = document.getElementById('memory-results');
    if (resEl) resEl.style.display = 'block';

    const accuracy = memoryState.totalTargetTiles > 0 
      ? Math.round((memoryState.totalCorrectHits / memoryState.totalTargetTiles) * 100) 
      : 0;
    const maxGridStr = `${memoryState.maxGridAchieved}x${memoryState.maxGridAchieved}`;
    const clearedStr = `${memoryState.clearedRounds} / ${memoryState.totalRounds}`;
    const cognitiveIndex = Math.min(100, Math.max(20, Math.round(
      (accuracy * 0.45) + 
      (memoryState.maxGridAchieved === 5 ? 35 : memoryState.maxGridAchieved === 4 ? 25 : 15) + 
      (memoryState.clearedRounds / memoryState.totalRounds) * 20
    )));

    const accEl = document.getElementById('memory-accuracy');
    if (accEl) accEl.textContent = `${accuracy}%`;

    const gridEl = document.getElementById('memory-max-grid');
    if (gridEl) gridEl.textContent = maxGridStr;

    const clearEl = document.getElementById('memory-cleared-rounds');
    if (clearEl) clearEl.textContent = clearedStr;

    const spanEl = document.getElementById('memory-span-score');
    if (spanEl) spanEl.textContent = cognitiveIndex;

    candidateData.memoryStats = {
      accuracy,
      maxGrid: maxGridStr,
      clearedRounds: memoryState.clearedRounds,
      cognitiveIndex
    };

    // Factor cognitive score into traits
    if (accuracy >= 80 && memoryState.maxGridAchieved >= 4) {
      scores['Reasoning'] = (scores['Reasoning'] || 0) + 3;
      scores['Practicality'] = (scores['Practicality'] || 0) + 2;
      scores['Organizing'] = (scores['Organizing'] || 0) + 2;
    } else if (accuracy >= 60) {
      scores['Reasoning'] = (scores['Reasoning'] || 0) + 2;
      scores['Practicality'] = (scores['Practicality'] || 0) + 1;
      scores['Organizing'] = (scores['Organizing'] || 0) + 1;
    } else {
      scores['Reasoning'] = (scores['Reasoning'] || 0) + 1;
    }
  }

  function continueFromMemoryTest() {
    const memoryBox = document.getElementById('spatial-memory-container');
    if (memoryBox) memoryBox.style.display = 'none';

    const scenarioCard = document.querySelector('.scenario-card');
    if (scenarioCard) scenarioCard.style.display = 'none';

    const optList = document.getElementById('options-list');
    if (optList) optList.style.display = 'none';

    // Show Self-Audit Stage
    const selfAuditBox = document.getElementById('self-audit-container');
    if (selfAuditBox) selfAuditBox.style.display = 'block';

    // Update sticky header for stage 3
    const qCur = document.getElementById('q-current');
    if (qCur) qCur.innerText = 'Stage 3';
    const qTot = document.getElementById('q-total');
    if (qTot) qTot.innerText = 'Self-Audit';

    const timerWidget = document.querySelector('.timer-widget');
    const timerText = document.getElementById('timer-text');
    if (timerText) timerText.innerText = 'Reflection';
    if (timerWidget) timerWidget.classList.remove('danger');

    const prog = document.getElementById('progress-fill');
    if (prog) prog.style.width = '100%';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ====================================================
     ASSESSMENT CONTROLLERS
  ==================================================== */
  function startAssessment() {
    const now = new Date();
    candidateData.testDate = now.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    candidateData.name = 'Cadet';
    candidateData.targetBoard = 'NDA/CDS';

    // Reset screen displays
    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('report-screen').classList.remove('active');
    document.getElementById('test-screen').classList.add('active');

    const selfAuditBox = document.getElementById('self-audit-container');
    if (selfAuditBox) selfAuditBox.style.display = 'none';

    const reflexBox = document.getElementById('shape-reflex-container');
    if (reflexBox) reflexBox.style.display = 'none';

    const memoryBox = document.getElementById('spatial-memory-container');
    if (memoryBox) memoryBox.style.display = 'none';

    const scenarioCard = document.querySelector('.scenario-card');
    if (scenarioCard) scenarioCard.style.display = 'block';

    const optList = document.getElementById('options-list');
    if (optList) optList.style.display = 'grid';
    
    currentQ = 0;
    scores = {
      Courage: 0, Practicality: 0, Leadership: 0, Initiative: 0,
      Responsibility: 0, Emotional_Stability: 0, Integrity: 0,
      Reasoning: 0, Teamwork: 0, Social_Adaptability: 0,
      Organizing: 0, Confidence: 0, Influence: 0, Determination: 0,
      Communication: 0, Adaptability: 0, Empathy: 0,
      Transparency: 0, Loyalty: 0
    };
    responseTimes = [];
    
    loadQuestion();
  }

  function loadQuestion() {
    if (currentQ >= assessmentData.length) {
      continueFromReflexTest();
      return;
    }

    const q = assessmentData[currentQ];
    const qCur = document.getElementById('q-current');
    if (qCur) qCur.innerText = currentQ + 1;
    
    const qTot = document.getElementById('q-total');
    if (qTot) qTot.innerText = assessmentData.length;
    
    const prog = document.getElementById('progress-fill');
    if (prog) prog.style.width = `${(currentQ / assessmentData.length) * 100}%`;

    const selfAuditBox = document.getElementById('self-audit-container');
    if (selfAuditBox) selfAuditBox.style.display = 'none';

    // Handle Shape Reflex Test (Q25)
    if (q.type === 'shapeReflex') {
      clearInterval(timerHandle);
      const scenarioCard = document.querySelector('.scenario-card');
      if (scenarioCard) scenarioCard.style.display = 'none';

      const optList = document.getElementById('options-list');
      if (optList) {
        optList.style.display = 'none';
        optList.innerHTML = '';
      }
      initShapeReflexContainer();
      return;
    }

    // Regular Situational Scenario
    const reflexBox = document.getElementById('shape-reflex-container');
    if (reflexBox) reflexBox.style.display = 'none';

    const scenarioCard = document.querySelector('.scenario-card');
    if (scenarioCard) scenarioCard.style.display = 'block';
    
    const textEl = document.getElementById('scenario-text');
    if (textEl) textEl.innerText = q.text;

    const container = document.getElementById('options-list');
    if (container) {
      container.style.display = 'grid';
      container.innerHTML = '';
      q.options.forEach((opt) => {
        const div = document.createElement('div');
        div.className = 'option-item';
        const m = opt.text.match(/^([A-I])\.\s*(.*)/);
        div.innerHTML = m
          ? `<span class="opt-letter">${m[1]}</span><span>${m[2]}</span>`
          : `<span>${opt.text}</span>`;
        div.onclick = () => selectOption(opt.traits);
        container.appendChild(div);
      });
    }

    // Dynamic Timer Calculation based on word length
    const wordCount = (q.text + q.options.map(o => o.text).join(' ')).split(/\s+/).filter(Boolean).length;
    timeLeft = Math.ceil(wordCount / 2.5) + 5 + 10;
    totalTimeForQ = timeLeft;

    updateTimerDisplay();
    clearInterval(timerHandle);
    timerHandle = setInterval(tick, 1000);
  }

  function tick() {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerHandle);
      responseTimes.push({ used: totalTimeForQ, total: totalTimeForQ, timeout: true });
      selectOption({});
    }
  }

  function updateTimerDisplay() {
    const el = document.getElementById('timer-text');
    const widget = document.querySelector('.timer-widget');
    if (el) el.innerText = `${timeLeft}s`;
    if (widget) widget.classList.toggle('danger', timeLeft <= 5);
  }

  function selectOption(traits) {
    clearInterval(timerHandle);
    const used = totalTimeForQ - timeLeft;
    responseTimes.push({ used, total: totalTimeForQ, timeout: false });

    for (const [t, v] of Object.entries(traits)) {
      if (scores[t] !== undefined) scores[t] += v;
    }
    currentQ++;

    const ts = document.getElementById('test-screen');
    if (ts) {
      ts.style.opacity = '0';
      setTimeout(() => {
        loadQuestion();
        ts.style.opacity = '1';
      }, 200);
    } else {
      loadQuestion();
    }
  }

  function resetSelfAuditInputs() {
    candidateData.selfRatings = {
      english: 0, groupSpeaking: 0, oneToOne: 0, discipline: 0, selfAwareness: 0
    };
    candidateData.reflections = {
      routine: { val: 'Yes', text: '' },
      strengths: { val: 'Yes', text: '' },
      weakness: { val: 'Yes', text: '' },
      contribution: { val: 'Yes', text: '' }
    };

    const sliderIds = ['slider-english', 'slider-group', 'slider-onetoone', 'slider-discipline', 'slider-awareness'];
    const badgeIds = ['val-english', 'val-group', 'val-onetoone', 'val-discipline', 'val-awareness'];
    sliderIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (el) el.value = 0;
      const b = document.getElementById(badgeIds[idx]);
      if (b) b.innerText = '0%';
    });

    ['ref-routine-text', 'ref-strengths-text', 'ref-weakness-text', 'ref-contribution-text'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    document.querySelectorAll('.btn-toggle-yn').forEach(b => {
      if (b.dataset.val === 'Yes') b.classList.add('active');
      else b.classList.remove('active');
    });
  }

  function resetAssessment() {
    clearInterval(timerHandle);
    if (memoryState && memoryState.memorizeTimerHandle) {
      clearInterval(memoryState.memorizeTimerHandle);
      memoryState.memorizeTimerHandle = null;
    }
    if (memoryState && memoryState.feedbackTimer) {
      clearTimeout(memoryState.feedbackTimer);
      memoryState.feedbackTimer = null;
    }
    if (reflexState) reflexState.running = false;
    if (memoryState) memoryState.running = false;

    const selfAuditBox = document.getElementById('self-audit-container');
    if (selfAuditBox) selfAuditBox.style.display = 'none';

    const reflexBox = document.getElementById('shape-reflex-container');
    if (reflexBox) reflexBox.style.display = 'none';

    const memoryBox = document.getElementById('spatial-memory-container');
    if (memoryBox) memoryBox.style.display = 'none';

    resetSelfAuditInputs();

    document.getElementById('report-screen').classList.remove('active');
    document.getElementById('test-screen').classList.remove('active');
    document.getElementById('intro-screen').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ====================================================
     SELF-AUDIT & CANDIDATURE HANDLERS
  ==================================================== */
  function initSelfAuditHandlers() {
    // 1. Slider input listeners
    const sliders = [
      { id: 'slider-english', badge: 'val-english', key: 'english' },
      { id: 'slider-group', badge: 'val-group', key: 'groupSpeaking' },
      { id: 'slider-onetoone', badge: 'val-onetoone', key: 'oneToOne' },
      { id: 'slider-discipline', badge: 'val-discipline', key: 'discipline' },
      { id: 'slider-awareness', badge: 'val-awareness', key: 'selfAwareness' }
    ];

    sliders.forEach(s => {
      const el = document.getElementById(s.id);
      const badge = document.getElementById(s.badge);
      if (el && badge) {
        el.addEventListener('input', function () {
          const v = parseInt(this.value, 10);
          candidateData.selfRatings[s.key] = v;
          badge.innerText = `${v}%`;
        });
      }
    });

    // 2. Yes/No Toggle listeners
    const toggleBtns = document.querySelectorAll('.btn-toggle-yn');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const qKey = this.dataset.q;
        const qVal = this.dataset.val;
        
        document.querySelectorAll(`.btn-toggle-yn[data-q="${qKey}"]`).forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        if (candidateData.reflections[qKey]) {
          candidateData.reflections[qKey].val = qVal;
        }
      });
    });

    // 3. Generate Report Card button listener
    const btnGen = document.getElementById('btnGenerateReportCard');
    if (btnGen) {
      btnGen.addEventListener('click', function () {
        const nameInput = document.getElementById('cand-name-audit');
        const entryInput = document.getElementById('cand-entry-audit');
        if (nameInput && nameInput.value.trim()) candidateData.name = nameInput.value.trim();
        if (entryInput && entryInput.value.trim()) candidateData.targetBoard = entryInput.value.trim();

        const refRoutine = document.getElementById('ref-routine-text');
        if (refRoutine) candidateData.reflections.routine.text = refRoutine.value.trim();

        const refStrengths = document.getElementById('ref-strengths-text');
        if (refStrengths) candidateData.reflections.strengths.text = refStrengths.value.trim();

        const refWeakness = document.getElementById('ref-weakness-text');
        if (refWeakness) candidateData.reflections.weakness.text = refWeakness.value.trim();

        const refContrib = document.getElementById('ref-contribution-text');
        if (refContrib) candidateData.reflections.contribution.text = refContrib.value.trim();

        generateReport();
      });
    }
  }

  /* ====================================================
     REPORT GENERATION ENGINE
  ==================================================== */
  function generateReport() {
    document.getElementById('test-screen').classList.remove('active');
    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('report-screen').classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 1. Build 16-OLQ list with normalized scores
    const raw = {
      "Effective Intelligence": (scores.Reasoning || 0) + (scores.Practicality || 0),
      "Reasoning Ability":      (scores.Reasoning || 0) * 2,
      "Organizing Ability":     (scores.Organizing || 0) + (scores.Practicality || 0),
      "Social Adaptability":    (scores.Social_Adaptability || 0) * 2,
      "Cooperation":            (scores.Teamwork || 0) * 2,
      "Sense of Responsibility":(scores.Responsibility || 0) * 2,
      "Initiative":             (scores.Initiative || 0) * 2,
      "Self Confidence":        (scores.Confidence || 0) * 2,
      "Speed of Decision":      (scores.Reasoning || 0) + (scores.Initiative || 0),
      "Ability to Influence":   (scores.Influence || 0) * 2,
      "Liveliness":             (scores.Social_Adaptability || 0) + (scores.Emotional_Stability || 0),
      "Determination":          (scores.Determination || 0) * 2,
      "Courage":                (scores.Courage || 0) * 2,
      "Emotional Stability":    (scores.Emotional_Stability || 0) * 2,
      "Integrity":              (scores.Integrity || 0) * 2,
      "Leadership":             (scores.Leadership || 0) * 2
    };

    const olqList = Object.entries(raw).map(([name, rawScore]) => {
      const meta = OLQ_META[name];
      const pct = normOLQ(rawScore);
      const tier = getTier(pct);
      const data = pct >= 65 ? meta.high : pct >= 40 ? meta.mod : meta.low;
      return { name, rawScore, pct, tier, data, meta, weight: meta.weight };
    });

    // 2. Sort by score percentage
    olqList.sort((a, b) => b.pct - a.pct);

    // 3. Composite SSB Readiness Score (weighted)
    const totalWeight = olqList.reduce((s, o) => s + o.weight, 0);
    const compositeScore = Math.round(olqList.reduce((s, o) => s + o.pct * o.weight, 0) / totalWeight);

    // 4. Decision Pattern Analysis
    const avgPct = responseTimes.length
      ? responseTimes.reduce((s, r) => s + (r.used / r.total), 0) / responseTimes.length
      : 0.5;
    const timeouts = responseTimes.filter(r => r.timeout).length;
    let decisionPattern, dpIcon;
    if (timeouts > 3) { decisionPattern = "Analysis Paralysis Risk"; dpIcon = "⚠"; }
    else if (avgPct < 0.35) { decisionPattern = "Instinctive Responder"; dpIcon = "⚡"; }
    else if (avgPct > 0.72) { decisionPattern = "Deliberate Analyst"; dpIcon = "🔍"; }
    else { decisionPattern = "Balanced Decision Maker"; dpIcon = "⚖"; }

    // 5. Archetype Classification
    const top3Names = olqList.slice(0, 3).map(o => o.name);
    const archetype = ARCHETYPES.find(a => a.match(top3Names)) || ARCHETYPES[ARCHETYPES.length - 1];

    // 6. SWOT Separation
    const highOLQs = olqList.filter(o => o.pct >= 62).slice(0, 4);
    const lowOLQs  = olqList.filter(o => o.pct < 45).slice(-4).reverse();
    const midOLQs  = olqList.filter(o => o.pct >= 42 && o.pct < 65);

    // 7. Psychological Assessor Observation Note
    const top1 = olqList[0].name;
    const bot1 = olqList[olqList.length - 1].name;
    const bot2 = olqList[olqList.length - 2].name;
    const obs = `Candidate demonstrates above-average ${top1} under unclear conditions, showing good potential in high-pressure situations. The primary development gap is ${bot1}, which creates visible inconsistency during social and leadership situations. A secondary weakness in ${bot2} further limits the candidate's performance in long group leadership situations. Recommend targeted stress training programs before the next assessment cycle. Overall profile is ${compositeScore >= 65 ? 'encouraging' : 'requires significant development'} relative to the selection benchmark.`;

    // 8. Update Candidate Header Info
    const nameInput = document.getElementById('cand-name-final');
    const entryInput = document.getElementById('cand-entry-final');
    if (nameInput && nameInput.value.trim()) candidateData.name = nameInput.value.trim();
    if (entryInput && entryInput.value.trim()) candidateData.targetBoard = entryInput.value.trim();

    const candNameEl = document.getElementById('dossier-candidate-name');
    if (candNameEl) candNameEl.innerText = candidateData.name || 'Cadet';
    
    const candBoardEl = document.getElementById('dossier-candidate-board');
    if (candBoardEl) candBoardEl.innerText = candidateData.targetBoard || 'NDA/CDS';

    const printDateEl = document.getElementById('print-date-el');
    if (printDateEl) {
      printDateEl.innerText = candidateData.testDate || new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // 9. Render All Dossier Sections
    renderExecSummary(archetype, compositeScore, obs, decisionPattern, dpIcon);
    renderRadarChart(olqList);
    renderOLQBars(olqList);
    renderSwot(highOLQs, lowOLQs, midOLQs, olqList);
    renderCompetencies(olqList);
    renderOLQTable(olqList);
    renderSelfAwareness(olqList, compositeScore);
    renderPracticeRecommendations(olqList);
  }

  /* ── SECTION 1: EXEC SUMMARY ── */
  function renderExecSummary(archetype, compositeScore, obs, decisionPattern, dpIcon) {
    const archName = document.getElementById('rep-archetype');
    if (archName) archName.innerText = archetype.name;

    const archBadge = document.getElementById('rep-archetype-badge');
    if (archBadge) archBadge.innerText = archetype.badge;

    const archSum = document.getElementById('rep-summary');
    if (archSum) archSum.innerText = archetype.summary;

    const archObs = document.getElementById('rep-observation');
    if (archObs) archObs.innerText = `"${obs}"`;

    const scoreText = document.getElementById('composite-score-text');
    if (scoreText) scoreText.innerText = compositeScore;

    const dpTag = document.getElementById('decision-pattern-tag');
    if (dpTag) dpTag.innerHTML = `<span>${dpIcon}</span><span>Decision Style: <strong>${decisionPattern}</strong></span>`;

    // Render Reflex & Memory battery stats
    const reflexAccuracy = reflexState.totalRounds > 0 
      ? Math.round((reflexState.correct / reflexState.totalRounds) * 100) 
      : 85;
    const reflexAvgRt = reflexState.reactionTimes.length > 0 
      ? Math.round(reflexState.reactionTimes.reduce((a, b) => a + b) / reflexState.reactionTimes.length) 
      : 380;
    const reflexSummaryStr = `${reflexAvgRt} ms (${reflexAccuracy}% Acc)`;

    const memStats = candidateData.memoryStats || { accuracy: 82, maxGrid: '4x4', clearedRounds: 6, cognitiveIndex: 78 };
    const memSummaryStr = `${memStats.maxGrid} Grid (${memStats.accuracy}% Acc)`;

    const repReflex = document.getElementById('rep-reflex-stat');
    if (repReflex) repReflex.innerText = reflexSummaryStr;

    const repMemory = document.getElementById('rep-memory-stat');
    if (repMemory) repMemory.innerText = memSummaryStr;

    const rl = getReadinessLabel(compositeScore);
    const rb = document.getElementById('readiness-badge');
    if (rb) {
      rb.innerText = rl.label;
      rb.style.color = rl.color;
      rb.style.background = rl.bg;
      rb.style.borderColor = rl.border;
    }

    const canvas = document.getElementById('gaugeCanvas');
    if (canvas) drawGauge(canvas, compositeScore);
  }

  function drawGauge(canvas, score) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h * 0.85, r = w * 0.36;

    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';

    // Track Background
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.lineWidth = 14;
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.stroke();

    // Score Gradient Arc
    const endAngle = Math.PI + (score / 100) * Math.PI;
    const grad = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
    grad.addColorStop(0, '#ef4444');
    grad.addColorStop(0.5, '#f59e0b');
    grad.addColorStop(1, '#10b981');

    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, endAngle, false);
    ctx.lineWidth = 14;
    ctx.strokeStyle = grad;
    ctx.stroke();

    // Minor Tick Marks
    ctx.lineWidth = 1.5;
    for (let i = 0; i <= 10; i++) {
      const ang = Math.PI + (i / 10) * Math.PI;
      const inner = r - 16, outer = r - 8;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(ang) * inner, cy + Math.sin(ang) * inner);
      ctx.lineTo(cx + Math.cos(ang) * outer, cy + Math.sin(ang) * outer);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.4)';
      ctx.stroke();
    }
  }

  /* ── SECTION 2: 16-POINT SPIDER / RADAR CHART ── */
  function renderRadarChart(olqList) {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2;
    const radius = Math.min(cx, cy) - 48;

    ctx.clearRect(0, 0, w, h);

    // Keep alphabetical or original 16 quality order for radar consistency
    const sortedByName = [...olqList].sort((a, b) => a.name.localeCompare(b.name));
    const totalAxes = sortedByName.length;
    const angleStep = (Math.PI * 2) / totalAxes;

    // Draw background concentric rings (25%, 50%, 65% Benchmark, 75%, 100%)
    const levels = [0.25, 0.50, 0.65, 0.75, 1.0];
    levels.forEach(level => {
      ctx.beginPath();
      for (let i = 0; i < totalAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const r = radius * level;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();

      if (level === 0.65) {
        // Minimum Suggested Requirement (65%) line highlight
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw Spokes & Labels
    ctx.font = '500 9px "Roboto Slab", serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      // Axis spoke
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis label
      const labelDistance = radius + 22;
      const lx = cx + Math.cos(angle) * labelDistance;
      const ly = cy + Math.sin(angle) * labelDistance;
      
      const words = sortedByName[i].name.split(' ');
      const shortName = words.length > 1 ? words.map(w => w[0]).join('') : words[0].substr(0, 4);
      ctx.fillText(shortName, lx, ly);
    }

    // Draw Candidate Score Polygon
    ctx.beginPath();
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = sortedByName[i].pct / 100;
      const r = radius * val;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(37, 99, 235, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data points on vertices
    for (let i = 0; i < totalAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const val = sortedByName[i].pct / 100;
      const r = radius * val;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;

      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#2563eb';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  /* ── SECTION 3: OLQ FACTOR BARS ── */
  function renderOLQBars(olqList) {
    const groups = { "Command": [], "Cognitive": [], "Interpersonal": [] };
    olqList.forEach(o => {
      const g = o.meta.group;
      if (groups[g]) groups[g].push(o);
    });

    let html = '';
    for (const [groupName, items] of Object.entries(groups)) {
      if (!items.length) continue;
      const sorted = [...items].sort((a, b) => b.pct - a.pct);
      html += `<div class="olq-group-title">${groupName} Qualities</div>`;
      sorted.forEach(o => {
        html += `
          <div class="olq-bar-row">
            <div class="olq-bar-name" title="${o.name}">${o.name}</div>
            <div class="olq-bar-track">
              <div class="olq-bar-fill" style="width:${o.pct}%;background:${o.tier.barColor};"></div>
            </div>
            <div class="olq-bar-pct">${o.pct}%</div>
            <div class="olq-tier-label" style="color:${o.tier.color};">${o.tier.short}</div>
          </div>`;
      });
    }
    const container = document.getElementById('olq-bars-container');
    if (container) container.innerHTML = html;
  }

  /* ── SECTION 4: ASSESSOR SWOT MATRIX ── */
  function renderSwot(highOLQs, lowOLQs, midOLQs, allOLQs) {
    const pick = (arr, key) => arr.map(o => `<li>${o.meta.swot[key]} <em style="font-size:.78rem;color:var(--text-muted);">(${o.name})</em></li>`).join('');

    const oppOLQs = midOLQs.slice(0, 3).length ? midOLQs.slice(0, 3) : allOLQs.slice(4, 7);
    const threatOLQs = lowOLQs.slice(0, 2).length ? lowOLQs.slice(0, 2) : allOLQs.slice(-2);

    const swotCells = [
      { key: 's', title: 'Strengths', color: '#10b981', bg: 'rgba(16,185,129,.06)', border: 'rgba(16,185,129,.25)', data: highOLQs.length ? pick(highOLQs.slice(0,3), 's') : '<li>Balanced performance profile across preliminary indicators.</li>' },
      { key: 'w', title: 'Weaknesses', color: '#ef4444', bg: 'rgba(239,68,68,.06)', border: 'rgba(239,68,68,.25)', data: lowOLQs.length ? pick(lowOLQs.slice(0,3), 'w') : '<li>No critical vulnerabilities detected — baseline competencies intact.</li>' },
      { key: 'o', title: 'Opportunities', color: '#3b82f6', bg: 'rgba(59,130,246,.06)', border: 'rgba(59,130,246,.25)', data: pick(oppOLQs, 'o') },
      { key: 't', title: 'Threats', color: '#f59e0b', bg: 'rgba(245,158,11,.06)', border: 'rgba(245,158,11,.25)', data: pick(threatOLQs, 't') }
    ];

    const grid = document.getElementById('swot-grid');
    if (grid) {
      grid.innerHTML = swotCells.map(c => `
        <div class="swot-cell" style="background:${c.bg};border-color:${c.border};">
          <div class="swot-cell-title" style="color:${c.color};">
            <span style="display:inline-block;width:10px;height:10px;background:${c.color};border-radius:50%;"></span>
            ${c.title}
          </div>
          <ul>${c.data}</ul>
        </div>`).join('');
    }
  }

  /* ── SECTION 5: COMPETENCY HIGHLIGHTS ── */
  function renderCompetencies(olqList) {
    const top3 = olqList.slice(0, 3);
    const bot3 = [...olqList].slice(-3).reverse();

    const topEl = document.getElementById('top-strengths-list');
    if (topEl) {
      topEl.innerHTML = top3.map(o => `
        <li>
          <strong style="color:${o.tier.color};">${o.name} — ${o.pct}% (${o.tier.label})</strong>
          <span>${o.data.interp}</span>
        </li>`).join('');
    }

    const botEl = document.getElementById('top-weaknesses-list');
    if (botEl) {
      botEl.innerHTML = bot3.map(o => `
        <li>
          <strong style="color:${o.tier.color};">${o.name} — ${o.pct}% (${o.tier.label})</strong>
          <span>${o.data.interp}</span>
        </li>`).join('');
    }
  }

  /* ── SECTION 6: 16-OLQ DEEP DIVE TABLE ── */
  function renderOLQTable(olqList) {
    const tableBody = document.getElementById('olq-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = olqList.map((o, i) => `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="olq-priority-rank" style="background:${o.tier.color}18;color:${o.tier.color};border:1px solid ${o.tier.color}35;">${i + 1}</span>
            <span style="font-weight:700;color:var(--text-main);">${o.name}</span>
          </div>
        </td>
        <td style="text-align:center;">
          <div style="font-weight:800;font-size:.95rem;color:${o.tier.color};">${o.pct}%</div>
          <div class="score-mini-bar" style="width:${Math.max(o.pct, 6)}%;background:${o.tier.barColor};margin:0 auto;min-width:4px;"></div>
        </td>
        <td style="text-align:center;">
          <span class="tier-pill" style="color:${o.tier.color};border-color:${o.tier.color}44;background:${o.tier.color}15;">${o.tier.short}</span>
        </td>
        <td style="color:var(--text-main);font-size:.85rem;line-height:1.45;">${o.data.interp}</td>
        <td style="color:var(--text-muted);font-size:.85rem;line-height:1.45;">${o.data.action}</td>
      </tr>`).join('');
  }

  /* ── SECTION 6: CANDIDATE SELF-AWARENESS & CANDIDATURE REFLECTION ── */
  function renderSelfAwareness(olqList, compositeScore) {
    const sr = candidateData.selfRatings || {
      english: 70, groupSpeaking: 65, oneToOne: 75, discipline: 70, selfAwareness: 80
    };
    const avgSelf = Math.round((sr.english + sr.groupSpeaking + sr.oneToOne + sr.discipline + sr.selfAwareness) / 5);
    const delta = avgSelf - compositeScore;
    const calibScore = Math.max(0, Math.min(100, Math.round(100 - Math.abs(delta) * 1.2)));

    // 1. Calibration Badge & Note
    const badgeEl = document.getElementById('calib-rating-badge');
    const scoreValEl = document.getElementById('calib-score-val');
    const noteEl = document.getElementById('calib-note-text');

    if (scoreValEl) scoreValEl.innerText = `${calibScore}%`;

    let badgeText = 'HIGH SELF-AWARENESS & CALIBRATION';
    let badgeColor = '#10b981';
    let badgeBg = 'rgba(16, 185, 129, 0.15)';
    let noteText = `<strong>Excellent Self-Calibration:</strong> Your average self-appraisal score (${avgSelf}%) is closely aligned with your situational assessment performance (${compositeScore}%). You show genuine introspection, realistic self-honesty, and psychological grounding—critical traits evaluated during the Interviewing Officer (IO) interview and Psychologist Self-Description Test.`;

    if (delta > 14) {
      badgeText = 'OPTIMISM / OVERESTIMATION GAP';
      badgeColor = '#f59e0b';
      badgeBg = 'rgba(245, 158, 11, 0.15)';
      noteText = `<strong>Perception Calibration Gap:</strong> You rated your capabilities (${avgSelf}%) ${Math.round(delta)}% higher than observed under acute situational dilemmas (${compositeScore}%). In SSB, assessors value grounded realism over aspirational self-rating. Recommendation: Test your communication and leadership under objective, unscripted pressure.`;
    } else if (delta < -14) {
      badgeText = 'UNRECOGNIZED POTENTIAL / SELF-DOUBT';
      badgeColor = '#6366f1';
      badgeBg = 'rgba(99, 102, 241, 0.15)';
      noteText = `<strong>Hidden Capability:</strong> Your actual situational reasoning and courage outscore your self-rating (${avgSelf}%) by ${Math.round(Math.abs(delta))}%. You underestimate your natural decisiveness. Build conscious self-confidence—the SSB board looks for leaders who recognize and stand firmly by their strengths.`;
    }

    if (badgeEl) {
      badgeEl.innerText = badgeText;
      badgeEl.style.color = badgeColor;
      badgeEl.style.backgroundColor = badgeBg;
      badgeEl.style.borderColor = badgeColor;
    }
    if (noteEl) noteEl.innerHTML = noteText;

    // 2. Render 5 Self-Rating Scorebars
    const barsContainer = document.getElementById('self-ratings-bars-container');
    if (barsContainer) {
      const items = [
        { label: 'English Speaking & Communication Skills', val: sr.english },
        { label: 'Confidence to Speak Before 100 Peers / People', val: sr.groupSpeaking },
        { label: 'One-to-One Communication & Interview Confidence', val: sr.oneToOne },
        { label: 'Daily Life Discipline & Habit Structure', val: sr.discipline },
        { label: 'Candidate Self-Awareness & Introspection', val: sr.selfAwareness }
      ];

      barsContainer.innerHTML = items.map(item => `
        <div class="self-bar-item">
          <div class="self-bar-top">
            <span>${item.label}</span>
            <span style="color:var(--brand-blue);font-weight:800;">${item.val}%</span>
          </div>
          <div class="self-bar-track">
            <div class="self-bar-fill" style="width: ${item.val}%;"></div>
          </div>
        </div>
      `).join('');
    }

    // 3. Render Introspection Grid
    const introGrid = document.getElementById('introspection-grid-container');
    if (introGrid) {
      const ref = candidateData.reflections || {
        routine: { val: 'Yes', text: '' },
        strengths: { val: 'Yes', text: '' },
        weakness: { val: 'Yes', text: '' },
        contribution: { val: 'Yes', text: '' }
      };

      const cards = [
        {
          title: 'Daily Sleep & Wake Routine',
          status: ref.routine.val === 'Yes' ? 'Structured Routine' : 'Irregular Schedule',
          statusColor: ref.routine.val === 'Yes' ? '#10b981' : '#f59e0b',
          content: ref.routine.text ? `&ldquo;${ref.routine.text}&rdquo;` : `<span style="color:var(--text-muted);font-style:normal;">(No specific timings entered)</span>`,
          analysis: 'A disciplined circadian rhythm directly correlates with physical stamina (Factor IV) and emotional resilience under rigorous military training regimes.'
        },
        {
          title: 'Spontaneous 3 Core Strengths',
          status: ref.strengths.val === 'Yes' ? 'Strengths Stated' : 'Needs Reflection',
          statusColor: ref.strengths.val === 'Yes' ? '#10b981' : '#f59e0b',
          content: ref.strengths.text ? `&ldquo;${ref.strengths.text}&rdquo;` : `<span style="color:var(--text-muted);font-style:normal;">(No strengths entered)</span>`,
          analysis: 'Instant awareness of personal strengths demonstrates high self-confidence and decisiveness during the Interviewing Officer (IO) rapid-fire series.'
        },
        {
          title: 'Acknowledged Weakness & Mitigation',
          status: ref.weakness.val === 'Yes' ? 'Weakness Identified' : 'Unidentified',
          statusColor: ref.weakness.val === 'Yes' ? '#10b981' : '#f59e0b',
          content: ref.weakness.text ? `&ldquo;${ref.weakness.text}&rdquo;` : `<span style="color:var(--text-muted);font-style:normal;">(No weakness entered)</span>`,
          analysis: 'SSB psychologists evaluate honest self-appraisal over feigned perfection. Recognizing genuine weaknesses with an active action plan scores high in Trainability & Integrity.'
        },
        {
          title: 'National Purpose & Armed Forces Contribution',
          status: ref.contribution.val === 'Yes' ? 'Articulated Purpose' : 'Exploring Purpose',
          statusColor: ref.contribution.val === 'Yes' ? '#10b981' : '#f59e0b',
          content: ref.contribution.text ? `&ldquo;${ref.contribution.text}&rdquo;` : `<span style="color:var(--text-muted);font-style:normal;">(No purpose entered)</span>`,
          analysis: 'Clear articulation of personal value and national service separates dedicated officer aspirants from casual applicants during the Board Conference.'
        }
      ];

      introGrid.innerHTML = cards.map(c => `
        <div class="intro-cell-card">
          <div class="intro-cell-header">
            <span class="intro-cell-title">${c.title}</span>
            <span class="intro-cell-status" style="color:${c.statusColor}; border-color:${c.statusColor}; background:${c.statusColor}18;">${c.status}</span>
          </div>
          <div class="intro-cell-content">${c.content}</div>
          <div class="intro-cell-analysis">${c.analysis}</div>
        </div>
      `).join('');
    }
  }

  /* ── SECTION 7: PORTAL PRACTICE RECOMMENDATIONS ── */
  function renderPracticeRecommendations(olqList) {
    const recGrid = document.getElementById('practice-recommendations-grid');
    if (!recGrid) return;

    const lowest = olqList.slice(-3).map(o => o.name);

    const recCards = [
      {
        badge: 'MOCK SIMULATOR',
        title: 'Stage-1 & Stage-2 Psych Mock Tests',
        desc: 'Build timed decision reflexes, thematic TAT stories, and rapid SRT responses under strict exam conditions.',
        link: 'mock.html',
        btnText: 'Launch Mock Tests'
      },
      {
        badge: 'FOUNDATION COURSE',
        title: 'The SSB: Game or Gamble? Course',
        desc: 'Comprehensive masterclass by Col Vyas (Retd.) decoding the psychology of selection, assessor mindset, and OLQ cultivation.',
        link: 'courses.html',
        btnText: 'Start Learning'
      },
      {
        badge: 'SELF-ANALYSIS TOOL',
        title: 'Interactive Aspirant SWOT Analysis',
        desc: 'Deep-dive into your personal character traits, military strengths, and action plan with the interactive SWOT mapper.',
        link: 'swot.html',
        btnText: 'Open SWOT Tool'
      }
    ];

    recGrid.innerHTML = recCards.map(c => `
      <div class="rec-card">
        <div style="display:flex;flex-direction:column;gap:8px;">
          <span class="rec-badge">${c.badge}</span>
          <h4 class="rec-title">${c.title}</h4>
          <p class="rec-desc">${c.desc}</p>
        </div>
        <a href="${c.link}" class="rec-link-btn">
          <span>${c.btnText}</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </a>
      </div>
    `).join('');
  }

  /* ====================================================
     PDF DOSSIER EXPORT ENGINE
  ==================================================== */
  function exportToPDF() {
    // Redraw charts at higher resolution for print
    const gauge = document.getElementById('gaugeCanvas');
    const scoreVal = parseInt(document.getElementById('composite-score-text')?.innerText || '70', 10);
    if (gauge) drawGauge(gauge, scoreVal);

    // Trigger Native Print Dialog with A4 Styles
    window.print();
  }

  /* ====================================================
     GLOBAL EVENT LISTENERS & ATTACHMENTS
  ==================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    // Start buttons
    const startBtns = document.querySelectorAll('.btn-start-free, #btnStartAssessment');
    startBtns.forEach(btn => btn.addEventListener('click', startAssessment));

    // Shape reflex start button
    const reflexStartBtn = document.getElementById('btnStartReflex');
    if (reflexStartBtn) reflexStartBtn.addEventListener('click', startShapeReflexTest);

    // Reflex touch buttons (Mobile/Tablet)
    const touchCircle = document.getElementById('touchCircleBtn');
    if (touchCircle) touchCircle.addEventListener('click', () => handleReflexResponse('f'));

    const touchSquare = document.getElementById('touchSquareBtn');
    if (touchSquare) touchSquare.addEventListener('click', () => handleReflexResponse('j'));

    // Reflex continue button
    const reflexContinueBtn = document.getElementById('btnContinueFromReflex');
    if (reflexContinueBtn) reflexContinueBtn.addEventListener('click', continueFromReflexTest);

    // Memory test buttons
    const memoryStartBtn = document.getElementById('btnStartMemoryTest');
    if (memoryStartBtn) memoryStartBtn.addEventListener('click', startMemoryTest);

    const memoryContinueBtn = document.getElementById('btnContinueFromMemory');
    if (memoryContinueBtn) memoryContinueBtn.addEventListener('click', continueFromMemoryTest);

    // Export PDF buttons
    const exportBtns = document.querySelectorAll('.btn-export-pdf');
    exportBtns.forEach(btn => btn.addEventListener('click', exportToPDF));

    // Retake Assessment buttons
    const retakeBtns = document.querySelectorAll('.btn-retake');
    retakeBtns.forEach(btn => btn.addEventListener('click', resetAssessment));

    // Initialize Self-Audit handlers (sliders, Yes/No toggles, report generator)
    initSelfAuditHandlers();

    // Keyboard controls for Reflex Test & Navigation
    document.addEventListener('keydown', function (e) {
      if (reflexState && reflexState.running) {
        if (e.key === 'f' || e.key === 'F') {
          e.preventDefault();
          handleReflexResponse('f');
        } else if (e.key === 'j' || e.key === 'J') {
          e.preventDefault();
          handleReflexResponse('j');
        }
      }
    });
  });

  // Expose API to window for inline HTML onclick calls if needed
  window.SSBReadiness = {
    startAssessment,
    selectOption,
    startShapeReflexTest,
    handleReflexResponse,
    continueFromReflexTest,
    startMemoryTest,
    continueFromMemoryTest,
    generateReport,
    resetAssessment,
    exportToPDF
  };

})();
