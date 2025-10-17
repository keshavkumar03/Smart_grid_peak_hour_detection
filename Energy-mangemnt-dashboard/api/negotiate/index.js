export default async function (context, req) {
  context.res.body = {
    url: context.bindingData.connection.url,
    accessToken: context.bindingData.connection.accessToken
  };
}
