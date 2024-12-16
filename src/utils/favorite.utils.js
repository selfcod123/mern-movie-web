//---File 16 Front

const favoriteUtils = {
    check: ({ listFavorites, mediaId }) => listFavorites && listFavorites.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined
  };

  export default favoriteUtils;
