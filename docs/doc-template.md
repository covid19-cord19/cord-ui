# Discovid.ai

In this notebook I present to you [discovid.ai](https://discovid.ai), a search and recommendation engine. It combines an **initial keyword search** with a recommendation system, so you can first make a precise query to find exactly what you are looking for and then click on a result to find further **related research** to widen your scope. Since it's based on latent relationships within the whole dataset, this can help to spark new insights!

It was built on the basis of several of my notebooks. Here a quick overview of what happens in each one of them (for detailed information and reproducible code have a look inside):

[Data preparation](https://www.kaggle.com/danielwolffram/cord-19-create-dataframe):

* data loading, cleaning and merging
* identification of the methods section of each paper and **extraction of study design**
* **language detection** to remove non-english articles (they would cause noise in our topic model)
* export as one clean dataframe

[Whoosh Search](https://www.kaggle.com/danielwolffram/whoosh-search):

* [Whoosh](https://whoosh.readthedocs.io/en/latest/intro.html) is a fast, pure Python search engine library. It allows you to build a customized search engine that uses the **Okapi BM25F** ranking function
* we implement a **customized tokenizer** for the use of [scispacy](https://allenai.github.io/scispacy/) to better handle **biomedical, scientific and clinical vocabulary**
* allows **boolean queries** (AND, OR, NOT, etc.) and **phrase queries** with double quotes
* **search specific fields** (abstract, authors, doi, methods, ...), for example:
* journal:(Studies in Natural Products Chemistry)
* authors:drosten
* doi:10.1101/2020.01.31.929042
* title:hydroxychloroquine AND methods:(randomized controlled trial)

[Topic Model](https://www.kaggle.com/danielwolffram/topic-modeling-finding-related-articles):

* [scispacy](https://allenai.github.io/scispacy/) for biomedical, scientific and clinical vocabulary
* lemmatization and stop word removal to improve **text quality**
* **bigrams and trigrams** to consider word pairs and triples (such as 'infectious disease' or 'public health')
* Latend Dirichlet Allocation for **unsupervised discovery of 50 fine-grained topics** (to find latent relationships in the corpus)
* view each paper as a mixture of topics to find related articles that have a similar topic-mixture

## [Topic Model](https://www.kaggle.com/danielwolffram/discovid-ai-a-search-and-recommendation-engine#Topic-Model)

To learn the latent topics in an unsupervised fashion we use Latent Dirichlet Allocation (LDA). This is generative statistical model which assumes that each document is a mixture of a given number of topics. Here, **a topic is a distribution over words**.

For our approach, we set the number of topics to 50. As the following plot shows, we get very **fine-grained topics that still seem meaningful and don't have too much overlap**. In our case, overlap isn't a big problem either, because we are not trying to assign one specific topic to each paper, but rather a mixture of topics.

To compute the distance between papers we use the **Jensen-Shannon divergence** of their topic distributions. This distance can then be interpreted as a measure for **topic-wise similarity** to find related articles.

_If the plot is cut, you can download the HTML [here](https://www.kaggle.com/danielwolffram/discovid-files)_.

Before removing the non-English articles, interestingly, the following topics had been discovered:

Topic #46: der die und bei mit von eine ist werden zu für sind oder einer des den nicht das als nach zur auf durch auch ein

Topic #40: de les des en une est dans du par un ou sont pour plus au que avec chez sur d'une qui cas être pas ces

Topic #32: de en el los que se con las por un es para pacientes como más virus son tratamiento su infección puede ha casos enfermedad entre

Topic #7: un che con sono nel alla più ha tra gli degli come rischio ed pazienti nella nei osteonecrosis ad essere stato studio salute anche have

As you can see, there was one for German, French, Spanish and Italian. To me this was very encouraging, because it demonstrates how powerful LDA is in learning hidden structures and that **it actually learns something meaningful**.

## [The Search Engine](https://www.kaggle.com/danielwolffram/discovid-ai-a-search-and-recommendation-engine#The-Search-Engine)

Here, you can have a look at the search engine within this notebook.

To further filter the results, you can either set the years you are interested in under advanced settings or you can click on "Only Covid-19 Papers" to only show papers that contain the word Covid-19 (or one of the many synonyms) in the text body.

By clicking on one of the search results, you can see other related papers (based on topic-wise similarity).

_This is just a preview, if it's too small just look at [discovid.ai](https://discovid.ai)._

## [Relevant Papers For Each Task](https://www.kaggle.com/danielwolffram/discovid-ai-a-search-and-recommendation-engine#Relevant-Papers-For-Each-Task)

## [Discussion](https://www.kaggle.com/danielwolffram/discovid-ai-a-search-and-recommendation-engine#Discussion)

This search and recommendation engine is meant to **assist subject-matter experts** in their research. You can either search for papers with very specific queries, or iteratively click your way through related articles to discover new insights.

We chose not to perform further text extraction to "answer" the questions more specifially, because we didn't want to add more noise to the rapidly increasing literature and information flood around Covid-19. At the end of the day, we need robust and reliable results and not an unverifiable output from a blackbox model, that might or might not be true. The risk of missing the context or the assumptions made in a paper, by reducing it to some keyphrases or extracted numbers, seems too high at this stage, that's why we leave further conclusions up to domain experts. We hope though, that this website can help them navigate the literature more efficiently and keep up with new publications.

**Pros:**

* Doesn't only use the title or meta-data, but the actual content (text body) of the articles
* Once trained, the model is easy and fast to apply
* Results show the extracted study design (if available) as a first quality indicator
* Easily filter by year or only show Covid-19 papers
* Complex queries possible (with boolean operators and phrase queries, etc.)
* Search specific fields (title, abstract, journal, authors, doi, **methods**)
* Explore related research (based on topic-wise similarity)
* Helps to **discover latent relationships** between articles that might drive innovation
* Links to registred clinical trials on [WHO International Clinical Trials Registry Platform (ICTRP)](https://www.who.int/ictrp/en/) whenever a trial is referenced in a paper
* **Bookmarks and personalized suggestions**

**Cons:**

* Unsupervised learning of topics is hard to verify (but the topic plot serves as a sanity check)
