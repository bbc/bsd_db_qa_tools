# act-test-template
Template to create a new repo for ACT tests

## Using this template

1. Create a copy of this template by clicking the [`Use this template` ](https://github.com/bbc/act-test-template/generate)  button.
2. Give your template a name in the form: `act-test-{category}` e.g. `act-test-networking`
3. Clone your new repo into your local workspace.
4. Ensure that you are running node 10
5. Initialise your new repo by running : `npm run bootstrap`
6. Run `npm test` so that you can ensure there are no failing tests
7. Commit the files into the repo.
8. Ensure repository collaberators are set to include the following; `Interactive TV` has Write access, `Interactive TV Admins` have Admin access and `Ninja Squirrels` have Admin access.
9. Run `npm run pipeline`
10. See [`CloudFront Guide`](https://github.com/bbc/certification-bbctvapps/blob/master/docs/cloudfront-guide.md) to make the repository accessible from the certification URLs.
