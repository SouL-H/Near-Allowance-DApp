set -e

echo
echo "Hello $1"
echo "The detailed information of the account is listed below."
echo ---------------------------------------------------------

near view $CONTRACT getInfo '{"wallet": "'"$1"'"}'
set -e

echo 'The amount to be paid has been transferred to your account.'
echo ---------------------------------------------------------
echo

exit 0
