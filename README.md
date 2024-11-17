# Science is...

Simple site for science related posts

## Features

- Page displaying list of scientists and a page displaying available posts, both pulled from the database
- Ability to add to scientists or posts.
- Ability for users to edit or delete their own posts and like posts by other users.
- Users must be logged in to perform any CRUD actions (beyond signing up/in)
- Drop down menu showing all scientists featured in existing posts with ability to filter posts relating to each.
- Useless feature but site header name is randomised from an array.

## Future considerations

Unfortunately ran out of time to add the below:

- Add media queries
- Add edit/delete/like options on filtered posts
- Make it so user can only like a post once, and clicking again removes the like.
- Add categories or tags to posts and implement ability to filter by those as well
- useReducer, perhaps more contexts

# Reflection

## What requirements did you achieve?

All of them as far as I can tell, although technically my dedicated route switches by scientists rather than categories

## Were there any requirements or goals that you were unable to achieve?

Ideally I would have added a category route also but I ran out of time. Hopefully the one I did implement is sufficient.

## If so, what was it that you found difficult about these tasks?

I spent way too long trying to figure out how to add only the scientists that appear in posts to the filter menu (rather than all from the scientist page, as some may not have associated posts). I couldn't figure out how to easily extract the names when looping through the posts array without creating duplicates.

Fortunately, after a lot of searching I came across sets. It was frustrating that it turned out to be such a simple solution, but glad that I was finally able to get it working!

## What errors or bugs did you encounter while completing your assignment? How did you solve them?

One particular error I kept having was when trying to set the form values to the current post data when editing an existing post. A painful combination of not knowing the best place to insert the post data into the form state, and taking a long time to realise I needed to add an index because it turned out to be a nested obect so I kept getting undefined.

## What went really well and what could have gone better?

I'm pretty disappointed with this one. It doesn't feel like I accomplished much given the amount of time I spent working on it. I made the mistake of jumping in before really having much of an idea or plan, and ended up having to rebuild the database tables several times and changed my mind on how everything would work.

I got bogged down in a few areas that I didn't expect because I think I made some parts unnecessarily complicated, which unfortunately kept me from adding further functionality.

I also hadn't realised that my localhost page had saved my previous zoom level so I was styling everything without realising I was zoomed in to 180%. It wasn't until I uploaded to render that I realised I needed to rescale the entire app.
