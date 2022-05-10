set -e

echo
echo ---------------------------------------------------------
echo "Name: $1"
echo "Wallet: $2"
echo "Mount: $3"
echo "Count: $4"
echo "AccountId: $5"
echo ---------------------------------------------------------
echo

near call $CONTRACT addStudent '{"name": "'"$1"'", "wallet": "'"$2"'","mount":"'$3'","count":"'$4'"}' --accountId $5 --amount $4


echo 'Student added!'
echo 'Thanks for your support :))'
echo

exit 0
