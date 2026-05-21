---
layout: page
title: Python
subtitle: 파이썬 관련 모든 포스트를 모아둔 곳입니다. (This is a collection of all Python-related posts.)
permalink: /python/
---

{% assign python_posts = site.categories.Python %}

<div class="posts-list">
  {% for post in python_posts %}
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
</div>
