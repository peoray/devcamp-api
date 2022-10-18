import slugify from 'slugify';

function slugifyName(name: string) {
  return slugify(name, {
    lower: true,
  });
}

export default slugifyName;
