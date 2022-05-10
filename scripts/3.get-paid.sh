set -e

echo
echo "Hello $1"
echo ---------------------------------------------------------

near call $CONTRACT getPay '{"wallet": "'"$1"'"}' --accountId $1
set -e

echo 'The amount to be paid has been transferred to your account.'
echo ---------------------------------------------------------
echo

near state $1 

exit 0
