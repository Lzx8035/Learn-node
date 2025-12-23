const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true, // 去除字符串两端的空白字符
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// 索引
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ startLocation: '2dsphere' });
tourSchema.index({ slug: 1 });

// 虚拟字段
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// 文档中间件: 在保存之前运行，生成 slug
tourSchema.pre('save', function (next) {
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  next();
});

// 查询中间件: 过滤 secretTour（除非设置了 bypassSecretTour 选项）
tourSchema.pre(/^find/, function (next) {
  // 如果设置了 bypassSecretTour 选项（admin 用户），则不过滤
  if (!this.getOptions().bypassSecretTour) {
    this.find({ secretTour: { $ne: true } });
  }
  this.start = Date.now();
  next();
});

// 聚合中间件: 过滤 secretTour 并保护 $geoNear
tourSchema.pre('aggregate', function (next) {
  const pipeline = this.pipeline();

  // 检查是否有 $geoNear（必须在第一位）
  const hasGeoNear = pipeline.length > 0 && pipeline[0].$geoNear;

  // 如果设置了 bypassSecretTour 选项（admin 用户），则不过滤
  if (!this.getOptions().bypassSecretTour) {
    if (hasGeoNear) {
      // $geoNear 必须在第一位，所以在其后添加 $match
      pipeline.splice(1, 0, { $match: { secretTour: { $ne: true } } });
    } else {
      // 没有 $geoNear，可以在第一位添加 $match
      pipeline.unshift({ $match: { secretTour: { $ne: true } } });
    }
  }

  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
