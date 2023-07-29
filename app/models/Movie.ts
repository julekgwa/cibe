import mongoose from 'mongoose';

export interface IMovie {
  title: string
}

const movieSchema = new mongoose.Schema<IMovie>({
  title: {
    type: String,
    required: true,
    unique: true,
  }
}, {
  timestamps: true
});

export const Movie = mongoose.model('Movie', movieSchema);