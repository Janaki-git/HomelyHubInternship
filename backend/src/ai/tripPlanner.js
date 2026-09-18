import groq from "./aiClient.js";

const systemPrompt = `You are a travel planner for a holiday rental website in India.

Create a day-by-day trip plan from the details the user gives you.

Rules:
1. Give exactly one entry per day of the trip.
2. Each day needs a short title and 3 to 4 activities.
3. Write each activity as "Morning: ...", "Afternoon: ...", or "Evening: ...".
4. Keep the plan inside the budget the user gave, and say roughly what things cost in rupees.
5. Match the activities to the interests the user picked.
6. Only suggest places that really exist in that destination. Do not invent places.
7. Keep the language simple and friendly.
8. Do not use emojis.

Reply with ONLY this JSON shape:
{
  "summary": "two sentences about the trip",
  "days": [
    { "day": 1, "title": "short title", "activities": ["Morning: ...", "Afternoon: ...", "Evening: ..."] }
  ],
  "tips": ["short tip", "short tip", "short tip"]
}`; //here we given the ai to  prompot tio givr the response on this

const planTrip = async (trip) => { //user info to ai in trip value
  const tripInfo = `- Destination: ${trip.destination}
- Total Budget: Rs ${trip.budget}
- Number of Days: ${trip.days}
- Number of People: ${trip.people} //this are the features present in the our browser
- Interests: ${trip.interests.join(", ")}`;//have more options to the user so ,


  //here we calling the groq
  const completion = await groq.chat.completions.create({ //asking groq to create ai to work
    model: "openai/gpt-oss-120b",//groq use this model 
    max_tokens: 2000, //tokens are creating to our content
    response_format: { type: "json_object" },//response in json format
    messages: [
      { role: "system", content: systemPrompt },//for system what to do
      { role: "user", content: tripInfo },//user details
    ],
  });

  return JSON.parse(completion.choices[0].message.content);//response comeback in this structure
};

export { planTrip };
