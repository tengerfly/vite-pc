if [ ! -d "/home/admin/pu-okr/dist" ]; then
  mkdir -p /home/admin/pu-okr/dist
fi
tar zxvf /home/admin/pu-okr/package.tgz -C /home/admin/pu-okr/dist
rm -rf /var/www/okr
if [ ! -d "/var/www/okr" ]; then
  mkdir -p /var/www/okr
fi
mv /home/admin/pu-okr/dist/index.html /var/www/okr
