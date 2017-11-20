## Language Processing 

### Question Answer Technology (QA)
#### Example: IBM Waston
##### Operation:

Watson parses questions into different keywords and sentence fragments in order to find statistically related phrases. Watson's main innovation was not in the creation of a new algorithm for this operation but rather `its ability to quickly execute hundreds of proven language analysis algorithms simultaneously`. `The more algorithms that find the same answer independently the more likely Watson is to be correct`. Once Watson has a small number of potential solutions, it is able to check against its database to ascertain whether the solution makes sense or not.

[IBM Waston Offical Website including the areas to target for language analysis](https://www.ibm.com/watson/products-services/)

[Reference](https://en.wikipedia.org/wiki/Watson_(computer)#Comparison_with_human_players)

### Tools
#### Google Cloud Prediction API 

It is a cloud based machine learning tool can help analyze the human natrual language. 
Target areas:
1. Sentiment Analysis (Google NLP Library)
2. Purchase Prediction
3. Spam Comment Detection
4. Prediction (of course, as the name says...)

##### Basic Sequences 
1. Collect Data: collect the type of data the analysis model expects to take. For example: "the chicken is dry", "the chicken is nasty", "the chicken is happy (:wink:)".

    A good set of data should be at least hunderds if not thousands in the same language (Questions to ponder: in a               multiculture environemnt, how to accept data in different language?). 

2. `Label the date`(where magic happens): by labelling data you teach the model your language, tell the the model the world you see. For example:

    Label: `food`
    User input "the chicken is dry."
    Expected from the model: `chicken` is labelled as `food`
  
    Label: `descriptive`
    User input: "the chicken is dry."
    Expected from the model: `dry` is labelled as `descriptive`
  
    Challenge: how to detect the association between `food` and `descriptive` ? One possible solution is to set a distance         from `food` to `descriptive`, say 10 characters, so if there are less than 10 characters between `chicken` and `dry`, the     model will think that `dry` descrips `chicken`, else not. 
  
    Labelling data is imperative and can be furture explored to enhance the features, e.g. understand the customers’ habits       and preferences on an individual level, and at scale, translate text from one language to another and communicate with         your customers in their own language, etc. 
    
    The disadvantage for merchaining learnining approach is that the model needs to constantly relearn and the domain is 
    rather fxied.

3. Train a Model with the Google Prediction API
Oparations on Google Cloud. For more details on specific how to do it: [Here, example is the on the target area of sentiment analysis](https://cloud.google.com/prediction/docs/sentiment_analysis)

#### Language Analysis Algorithms
##### Graph: words -> nodes(weighted/unweighted), syntax relations -> edges (directed/undirected)
The graph we need to implement is a weighted directe graph with verticed weighted differently to indicate its importance and keywords point to each other to show relationships.The egdes can be weighted too depending on relationships between vertices.

To decide the weight assigned to each node, according to the  graph  theory, `centrality` identifies the most important vertices within a graph and this approach is used for the task of ranking the vertices. 

[More detailed claculation and information is here](https://www.researchgate.net/publication/280092953_An_Overview_of_Graph-Based_Keyword_Extraction_Methods_and_Approaches)
