---
layout: page
title: Database
subtitle: 데이터베이스와 SQL 학습 기록입니다. (Database and SQL learning records.)
permalink: /database/
---

{% comment %}
강좌 순서대로 표시하기 위해 날짜 오름차순으로 정렬합니다. (1강 → 7강)
{% endcomment %}
{% assign db_posts = "" | split: "" %}
{% if site.categories.Database %}
  {% assign db_posts = site.categories.Database %}
{% elsif site.categories.database %}
  {% assign db_posts = site.categories.database %}
{% endif %}
{% assign db_posts = db_posts | sort: 'date' %}

<div class="posts-list">
  <h4 class="text-muted mb-4" style="border-left: 5px solid #0085A1; padding-left: 15px;">데이터베이스 학습 목록 <br><small style="font-size: 0.8em;">(Database Learning List)</small></h4>
  
  {% for post in db_posts %}
  <article class="post-preview" style="margin-bottom: 2rem; border-bottom: 1px solid #eee; padding-bottom: 1rem;">
    <a href="{{ post.url | relative_url }}">
      <h2 class="post-title" style="margin-bottom: 0.5rem; color: #404040;">{{ post.title }}</h2>
      {% if post.subtitle %}
        <h3 class="post-subtitle" style="font-weight: 300; color: #808080; font-size: 1.1rem;">{{ post.subtitle }}</h3>
      {% endif %}
    </a>
    
    <p class="post-meta" style="font-style: italic; font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #808080; font-size: 0.9rem;">
      Posted on {{ post.date | date: "%B %-d, %Y" }}
    </p>

    <div class="post-entry" style="margin-bottom: 1rem;">
      {{ post.excerpt | strip_html | truncatewords: 50 }}
      <a href="{{ post.url | relative_url }}" class="post-read-more" style="font-weight: 800; color: #0085A1;">[Read&nbsp;More]</a>
    </div>

    {% if post.tags.size > 0 %}
    <div class="blog-tags">
      <span style="font-size: 0.8rem; color: #808080;">Tags:</span>
      <ul class="d-inline list-inline" style="display: inline; padding: 0;">
        {% for tag in post.tags %}
        <li class="list-inline-item" style="display: inline; margin-right: 5px;">
          <a href="{{ '/tags' | relative_url }}#{{- tag -}}" style="font-size: 0.8rem; background: #eee; padding: 2px 8px; border-radius: 10px; text-decoration: none; color: #666;">{{- tag -}}</a>
        </li>
        {% endfor %}
      </ul>
    </div>
    {% endif %}
  </article>
  {% endfor %}

  {% if db_posts.size == 0 %}
    <div class="alert alert-warning">
      데이터베이스 카테고리에 등록된 포스트를 찾을 수 없습니다. <br>(No posts found in the Database category.)<br>
      (현재 등록된 총 글 수: {{ site.posts.size }}) <br>(Total posts currently registered: {{ site.posts.size }})
    </div>
  {% endif %}
</div>
