
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({

  "plot": {
    type: String,
    required: [true, "Plot must be provided"],
    default: "Lorem ipsum dolor sit amet",
  },

  "genres": {
    type: Array,
    default: ["Short"],
  },

  "runtime": {
    type: Number,
    default: 1
  },

  "cast": {
    type: Array,
    default: ["Charles Kayser", "John Ott"],
  },

  "num_mflix_comments": {
    type: Number,
    default: 1
  },

  "title": {
    type: String,
    required: [true, "Title must be provided"],
    default: "Lorem 2"
  },

  "fullplot": {
    type: Array,
    default: ["Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium consectetur distinctio accusantium suscipit perspiciatis, sapiente doloremque! Odit asperiores ea, ab hic nisi, magnam, modi recusandae quas nam voluptate cumque. Aperiam."]
  },

  "languages": {
    type: Array,
    default: ["English"],
  },

  "countries": {
    type: Array,
    default: ["USA"],
  },

  "released": {
    type: Date,
    default: Date.now(),
  },

  "directors": {
    type: Array,
    default: ["William K.L. Dickson"],
  },

  writers: {
    type: Array,
    default: ["Winsor McCay"],
  },

  "rated": {
    type: String,
    default: "4.9"
  },

  "awards": {
    "wins": {
      type: Number,
      default: 1
    },
    "nominations": {
      type: Number,
      default: 0
    },
    "text": {
      type: String,
      default: "1 win"
    }
  },

  "poster": {
    type: String,
    default: "url",
  },

  "lastupdated": {
    type: Date,
    default: Date.now(),
  },

  "year": {
    type: Number,
    required: [true, "Year must be provided"],
    default: 2023
  },

  "imdb": {
    "rating": {
      type: Number,
      default: 6.2
    },
    "votes": {
      type: Number,
      default: 1189
    },
    "id": {
      type: Number,
      default: 5
    }
  },

  "type": {
    type: String,
    default: "movie"
  },

  "tomatoes": {
    "consensus": {
      type: String,
      default: "Lorem ipsum dolor ismet."
    },
    "critic": {
      "rating": {
        type: Number,
        default: 8
      },
      "numReviews": {
        type: Number,
        default: 38
      },
      "meter": {
        type: Number,
        default: 100
      }
    },
    "fresh": {
      type: Number,
      default: 38
    },
    "production": {
      type: String,
      default: "Lorem ipsum"
    },
    "rotten": {
      type: Number,
      default: 38
    },
    "website": {
      type: String,
      default: "url"
    },
    "viewer": {
      "rating": {
        type: Number,
        default: 3
      },
      "numReviews": {
        type: Number,
        default: 184
      },
      "meter": {
        type: Number,
        default: 32
      }
    },
  },
  "createdAt": {
    type: Date,
    default: Date.now(),
  },

});

module.exports = mongoose.model('movie', movieSchema);