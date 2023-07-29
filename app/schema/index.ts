import S from 'fluent-json-schema';

export const addMovieSchema = {
  body: S.object().prop('title', S.string().required()),
  headers: S.object().prop('x-api-channel', S.string().required())
};