---
title: Skills
permalink: skills/
---

<!-- skills -->
<p>
  I have at least a basic understanding of the following languages and 
  technologies:
</p>

{% for category in site.data.skills %}
  <h2>{{ category.name }}</h2>
  <ul>
    {% for skill in category.skills %}
      <li>{{ skill }}</li>
    {% endfor %}
  </ul>
{% endfor %}
