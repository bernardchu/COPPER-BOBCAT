
# Deployment

- copperbob.azurewebsites.net is continuously deployed from the master branch of the repo.
- copperbob-stage.azurewebsites.net is continuously deployed from the staging branch of the repo.
- Master should ideally never be broken.
- Ensure staging works as intended before pulling to master.

# To make edits:
- Fork a copy of the repo and clone it locally.
- Make your changes and commit them.
- Before pushing, rebase from upstream (git pull --rebase upstream master).
- Push to your fork.
- Pull from your fork to the staging branch of the org repo.
- Ensure nothing is broken on staging.
- Pull from staging to master on the org repo.

# Adding questions

Navigate to copperbob.azurewebsites.net and log in.
Go to copperbob.azurewebsites.net/#/admin. You can edit questions in line, create questions, or destroy questions. Questions should be prompted with === ?.


# Known roadblocks

- There can only be four simultaneous connections to the database. If you expect to see questions displayed but don’t, it is possible that you have too many connections. 
- Because the website URL (copperbob.azurewebsites.net) is hard-coded (this is the URL that Github knows to associate with our app) this makes it a little tricky to test Auth-related things locally or on the staging branch. For example, you might go to localhost:3000 and log in via Github, but because of the info that Github has on file, you’ll get redirected to copperbob.azurewebsites.net instead of the corresponding page on localhost. For non-auth related things, this is a simple matter of removing the ensureAuthenticated middleware function from the server route at root (app.get(‘/’)) for testing purposes.
