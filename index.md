---
layout: default
title: About
permalink: /
---

I am a software engineering student at the [Rochester Institute of
Technology](http://www.rit.edu/) and a member of the [Society of Software
Engineers](https://sse.se.rit.edu/). I currently live on campus. My home town
is Weehawken, New Jersey.

I love working with computers, and am passionate about making great software.
Lately, I enjoy tinkering with [Ruby](https://www.ruby-lang.org/en/), [Ruby on
Rails](http://rubyonrails.org/), [Common Lisp](http://common-lisp.net/),
front-end web development, [Arch Linux](https://www.archlinux.org/), and writing
open source software on [GitHub](https://github.com/).

<hr>

<ul class="list-inline">
  {% for link in site.data.links %}
    <li>
      <a href="{{ link.url }}" target="_blank">
        <span class="fa fa-fw fa-{{ link.icon }}"></span>
        {{ link.name }}
      </a>
    </li>
  {% endfor %}
</ul>
