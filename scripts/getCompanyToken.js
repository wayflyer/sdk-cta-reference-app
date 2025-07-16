import axios from "axios";
import { program } from "commander";

program
  .name("getCompanyToken")
  .description("Get company token using partner credentials")
  .version("1.0.0")
  .requiredOption("-p, --partner-id <id>", "Partner ID")
  .requiredOption("-s, --partner-secret <secret>", "Partner Secret")
  .requiredOption("-c, --company-id <id>", "Company ID")
  .requiredOption("-u, --user-id <id>", "User ID");

program.parse();

const options = program.opts();
const { partnerId, partnerSecret, companyId, userId } = options;

axios
  .post("https://api.wayflyer.com/financing/v1/partner-token/", {
    partner_id: partnerId,
    partner_secret: partnerSecret,
  })
  .then((response) => {
    const partnerToken = response.data.token;

    return axios.post(
      "https://api.wayflyer.com/financing/v1/partner/company-token/",
      {
        company_id: companyId,
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${partnerToken}`,
        },
      },
    );
  })
  .then((response) => {
    console.log(response.data.token);
  })
  .catch((error) => {
    console.error(error.response?.data || error.message);
  });
