---
layout: page
title: Database
subtitle: 데이터베이스와 SQL 학습 기록입니다.
permalink: /database/
---

{% assign db_posts = site.categories.Database %}

<ul class="posts-list list-unstyled" role="list">
  {% for post in db_posts %}
  <li class="post-preview">
    <article>
      <a href="{{ post.url | absolute_url }}">
        <h2 class="post-title">{{ post.title | strip_html }}</h2>
        {% if post.subtitle %}
          <h3 class="post-subtitle">{{ post.subtitle | strip_html }}</h3>
        {% endif %}
      </a>
      
      <p class="post-meta">
        {% assign date_format = site.date_format | default: "%B %-d, %Y" %}
        Posted on {{ post.date | date: date_format }}
      </p>

      <div class="post-entry">
        {% assign excerpt_length = site.excerpt_length | default: 50 %}
        {{ post.excerpt | strip_html | truncatewords: excerpt_length }}
        <a href="{{ post.url | absolute_url }}" class="post-read-more">[Read&nbsp;More]</a>
      </div>

      {% if post.tags.size > 0 %}
      <div class="blog-tags">
        <span>Tags:</span>
        <ul class="d-inline list-inline" role="list">
          {% for tag in post.tags %}
          <li class="list-inline-item">
            <a href="{{ '/tags' | absolute_url }}#{{- tag -}}">{{- tag -}}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endif %}

    </article>
  </li>
  {% endfor %}
</ul>
