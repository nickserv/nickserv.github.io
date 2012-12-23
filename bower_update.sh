# Updates Bower packages and reinstalls latest versions of Bootswatch themes

pushd public
bower update
pushd components/bootstrap.css/css
curl http://bootswatch.com/cyborg/bootstrap.css -o bootstrap-cyborg.css
curl http://bootswatch.com/cyborg/bootstrap.min.css -o bootstrap-cyborg.min.css
curl http://bootswatch.com/slate/bootstrap.css -o bootstrap-slate.css
curl http://bootswatch.com/slate/bootstrap.min.css -o bootstrap-slate.min.css
popd
popd
