define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login a user",
    "name": "LoginUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email-address.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The user's password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Logged in user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Logged in user.</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>The user data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide email and password.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Invalid login credentials.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/authenticationController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Logout a user",
    "name": "LogoutUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>The user's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Cookie",
            "optional": false,
            "field": "cookie",
            "description": "<p>User logged out.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/authenticationController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/refresh",
    "title": "Refresh an access token",
    "name": "RefreshToken",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>The user's refresh token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Refreshed access token.</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>The user data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidRefreshToken",
            "description": "<p>The refresh token is invalid.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/authenticationController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/register-admin",
    "title": "Registers a new admin",
    "name": "RegisterAdmin",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email-address.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The user's first name.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The user's last name.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>The user's organization id.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>The user's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Token sent to email-address.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide first name, last name and email-address.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/authenticationController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/register-customer",
    "title": "Registers a new customer",
    "name": "RegisterCustomer",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email-address.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The user's first name.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The user's last name.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>The user's organization id.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>The user's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Token sent to email-address.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide first name, last name and email-address.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/authenticationController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/register-user",
    "title": "Registers a new user",
    "name": "RegisterUser",
    "group": "Authentication",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email-address.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>The user's first name.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>The user's last name.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>The user's organization id.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>The user's access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Token sent to email-address.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide first name, last name and email-address.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/authenticationController.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/buildings",
    "title": "Create Building",
    "name": "CreateBuilding",
    "group": "Building",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Related organization id.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "building_name",
            "description": "<p>Name of building.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Building",
            "optional": false,
            "field": "building",
            "description": "<p>Created Building.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/buildingController.js",
    "groupTitle": "Building"
  },
  {
    "type": "delete",
    "url": "/buildings/:building_id",
    "title": "Delete Building",
    "name": "DeleteBuilding",
    "group": "Building",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Buildings unique ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "BuildingNotFound",
            "description": "<p>The id of the Building was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/buildingController.js",
    "groupTitle": "Building"
  },
  {
    "type": "get",
    "url": "/buildings",
    "title": "Get Buildings",
    "name": "GetBuildings",
    "group": "Building",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Id of organization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "buildings",
            "description": "<p>Array of building objects.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/buildingController.js",
    "groupTitle": "Building"
  },
  {
    "type": "put",
    "url": "/buildings/:building_id",
    "title": "Update Building",
    "name": "UpdateBuilding",
    "group": "Building",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Buildings unique ID.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Updated organization id.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "building_name",
            "description": "<p>Updated name of building.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Building",
            "optional": false,
            "field": "building",
            "description": "<p>Updated Building.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/buildingController.js",
    "groupTitle": "Building"
  },
  {
    "type": "post",
    "url": "/organizations",
    "title": "Create Organization",
    "name": "CreateOrganization",
    "group": "Organization",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "organization_name",
            "description": "<p>Name of organization.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "organization_number",
            "description": "<p>Organization number.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "postal_code",
            "description": "<p>Organization postal code.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "postal_zone",
            "description": "<p>Organization postal zone.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "contact_name",
            "description": "<p>Contact person for Organization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "organization",
            "description": "<p>Created Organization.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/organizationController.js",
    "groupTitle": "Organization"
  },
  {
    "type": "get",
    "url": "/organizations",
    "title": "Get Organizations",
    "name": "GetOrganizations",
    "group": "Organization",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "organizations",
            "description": "<p>Array of organization objects.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/organizationController.js",
    "groupTitle": "Organization"
  },
  {
    "type": "put",
    "url": "/organizations/:organization_id",
    "title": "Update Organization",
    "name": "UpdateOrganization",
    "group": "Organization",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Organizations unique ID.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "organization_name",
            "description": "<p>Name of organization.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "organization_number",
            "description": "<p>Organization number.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "postal_code",
            "description": "<p>Organization postal code.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "postal_zone",
            "description": "<p>Organization postal zone.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "contact_name",
            "description": "<p>Contact person for Organization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Organization",
            "optional": false,
            "field": "organization",
            "description": "<p>Updated Organization.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/organizationController.js",
    "groupTitle": "Organization"
  },
  {
    "type": "post",
    "url": "/forgot-password",
    "title": "Forgot password functionality. Sends a reset-password email to the provided email.",
    "name": "ForgotPassword",
    "group": "Password",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email address.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Token sendt to email-address.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide an email-address.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/passwordController.js",
    "groupTitle": "Password"
  },
  {
    "type": "patch",
    "url": "/reset-password",
    "title": "Resets a user's password",
    "name": "ResetPassword",
    "group": "Password",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>The user's new password.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "resetToken",
            "description": "<p>The user's password reset token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Password was reset.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide a new password.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/passwordController.js",
    "groupTitle": "Password"
  },
  {
    "type": "patch",
    "url": "/update-password",
    "title": "Updates a user's password",
    "name": "UpdatePassword",
    "group": "Password",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "oldPassword",
            "description": "<p>The user's email-address.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>The user's first name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Refresh token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Access token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide old and new password.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/passwordController.js",
    "groupTitle": "Password"
  },
  {
    "type": "post",
    "url": "/policies",
    "title": "Create Policy",
    "name": "CreatePolicy",
    "group": "Policy",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "max_time_per_reservation",
            "description": "<p>Max hours per reservation.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "max_days_lookup",
            "description": "<p>How far ahead in time one can book.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "reservations_per_period",
            "description": "<p>How many reservations one can have in a period.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Organization unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Policy",
            "optional": false,
            "field": "policy",
            "description": "<p>Created Policy.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyController.js",
    "groupTitle": "Policy"
  },
  {
    "type": "delete",
    "url": "/policies/:id",
    "title": "Delete Policy",
    "name": "DeletePolicy",
    "group": "Policy",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Policy unique ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PolicyNotFound",
            "description": "<p>The id of the Policy was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyController.js",
    "groupTitle": "Policy"
  },
  {
    "type": "get",
    "url": "/policies",
    "title": "Get Policy",
    "name": "GetPolicy",
    "group": "Policy",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>REQUIRED. Related organization id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "policy_id",
            "description": "<p>Policy unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_time_per_reservation",
            "description": "<p>Max hours per reservation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "max_days_lookup",
            "description": "<p>How far ahead in time one can book.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "reservations_per_period",
            "description": "<p>How many reservations one can have in a period.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Organization unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"policy_id\": 2,\n  \"max_time_per_reservation\": 4,\n  \"max_days_lookup\": 14,\n  \"reservations_per_period\": 4,\n  \"organization_id\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PolicyNotFound",
            "description": "<p>The id of the Policy was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyController.js",
    "groupTitle": "Policy"
  },
  {
    "type": "post",
    "url": "/policy-times",
    "title": "Create Policy Times",
    "name": "CreatePolicyTimes",
    "group": "PolicyTimes",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_mon",
            "description": "<p>Opening time Monday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_mon",
            "description": "<p>Closing time Monday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_tue",
            "description": "<p>Opening time Tuesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_tue",
            "description": "<p>Closing time Tuesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_wed",
            "description": "<p>Opening time Wednesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_wed",
            "description": "<p>Closing time Wednesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_thu",
            "description": "<p>Opening time Thursday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_thu",
            "description": "<p>Closing time Thursday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_fri",
            "description": "<p>Opening time Friday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_fri",
            "description": "<p>Closing time Friday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_sat",
            "description": "<p>Opening time Saturday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_sat",
            "description": "<p>Closing time Saturday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_sun",
            "description": "<p>Opening time Sunday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_sun",
            "description": "<p>Closing time Sunday.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Building unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "PolicyTimes",
            "optional": false,
            "field": "policyTimes",
            "description": "<p>Created Policy Times.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyTimesController.js",
    "groupTitle": "PolicyTimes"
  },
  {
    "type": "delete",
    "url": "/policy-times/:id",
    "title": "Delete Policy Times",
    "name": "DeletePolicyTimes",
    "group": "PolicyTimes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>PolicyTimes unique ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "PolicyTimesNotFound",
            "description": "<p>The id of the PolicyTimes was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyTimesController.js",
    "groupTitle": "PolicyTimes"
  },
  {
    "type": "get",
    "url": "/policy-times",
    "title": "Get Policy Times",
    "name": "GetPolicyTimes",
    "group": "PolicyTimes",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>REQUIRED. The policy's related building.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_mon",
            "description": "<p>Opening time Monday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_mon",
            "description": "<p>Closing time Monday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_tue",
            "description": "<p>Opening time Tuesday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_tue",
            "description": "<p>Closing time Tuesday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_wed",
            "description": "<p>Opening time Wednesday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_wed",
            "description": "<p>Closing time Wednesday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_thu",
            "description": "<p>Opening time Thursday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_thu",
            "description": "<p>Closing time Thursday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_fri",
            "description": "<p>Opening time Friday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_fri",
            "description": "<p>Closing time Friday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_sat",
            "description": "<p>Opening time Saturday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_sat",
            "description": "<p>Closing time Saturday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "start_sun",
            "description": "<p>Opening time Sunday.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "end_sun",
            "description": "<p>Closing time Sunday.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Building unique ID.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"start_mon\": \"07:00\",\n  \"end_mon\": \"18:00\",\n  ...\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyTimesController.js",
    "groupTitle": "PolicyTimes"
  },
  {
    "type": "put",
    "url": "/policy-times/:",
    "title": "Update Policy Times",
    "name": "UpdatePolicyTimes",
    "group": "PolicyTimes",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>REQUIRED. Building unique ID.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_mon",
            "description": "<p>Opening time Monday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_mon",
            "description": "<p>Closing time Monday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_tue",
            "description": "<p>Opening time Tuesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_tue",
            "description": "<p>Closing time Tuesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_wed",
            "description": "<p>Opening time Wednesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_wed",
            "description": "<p>Closing time Wednesday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_thu",
            "description": "<p>Opening time Thursday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_thu",
            "description": "<p>Closing time Thursday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_fri",
            "description": "<p>Opening time Friday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_fri",
            "description": "<p>Closing time Friday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_sat",
            "description": "<p>Opening time Saturday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_sat",
            "description": "<p>Closing time Saturday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "start_sun",
            "description": "<p>Opening time Sunday.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "end_sun",
            "description": "<p>Closing time Sunday.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "PolicyTimes",
            "optional": false,
            "field": "policyTimes",
            "description": "<p>Updated PolicyTimes.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyTimesController.js",
    "groupTitle": "PolicyTimes"
  },
  {
    "type": "put",
    "url": "/policies/:id",
    "title": "Update Policy",
    "name": "UpdatePolicy",
    "group": "Policy",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Policy unique ID.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "max_time_per_reservation",
            "description": "<p>Max hours per reservation.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "max_days_lookup",
            "description": "<p>How far ahead in time one can book.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "reservations_per_period",
            "description": "<p>How many reservations one can have in a period.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Organization unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Policy",
            "optional": false,
            "field": "policy",
            "description": "<p>Updated Policy.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/policyController.js",
    "groupTitle": "Policy"
  },
  {
    "type": "post",
    "url": "/reservations",
    "title": "Create Reservation",
    "name": "CreateReservation",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "Datetime",
            "optional": false,
            "field": "start",
            "description": "<p>Starttime of reservation.</p>"
          },
          {
            "group": "Body",
            "type": "Datetime",
            "optional": false,
            "field": "end",
            "description": "<p>Endtime of reservation.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "room_id",
            "description": "<p>Reservation location.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Reservation owner.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/reservationController.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "put",
    "url": "/reservations",
    "title": "Update Reservation",
    "name": "CreateReservation",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "reservation_id",
            "description": "<p>Reservation unique ID.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "Datetime",
            "optional": false,
            "field": "start",
            "description": "<p>Starttime of reservation.</p>"
          },
          {
            "group": "Body",
            "type": "Datetime",
            "optional": false,
            "field": "end",
            "description": "<p>Endtime of reservation.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "room_id",
            "description": "<p>Reservation location.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Reservation owner.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/reservationController.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "delete",
    "url": "/reservations/:reservation_id",
    "title": "Delete Reservation",
    "name": "DeleteReservation",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "reservation_id",
            "description": "<p>Reservation unique ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ReservationNotFound",
            "description": "<p>The id of the Reservation was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/reservationController.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "get",
    "url": "/reservations/:reservation_id",
    "title": "Get Reservation",
    "name": "GetReservation",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "reservation_id",
            "description": "<p>Reservation unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "res_id",
            "description": "<p>Reservation unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "start",
            "description": "<p>Starttime of reservation.</p>"
          },
          {
            "group": "Success 200",
            "type": "Datetime",
            "optional": false,
            "field": "end",
            "description": "<p>Endtime of reservation.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room_id",
            "description": "<p>Reservation location.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Reservation owner.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "ReservationNotFound",
            "description": "<p>The id of the Reservation was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/reservationController.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "get",
    "url": "/reservations",
    "title": "Get Reservations",
    "name": "GetReservations",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Id of organization.</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of user.</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>Id of room.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reservations",
            "description": "<p>Array of Reservation objects.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/reservationController.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "get",
    "url": "/reservations",
    "title": "Get Reservations",
    "name": "GetReservations",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Id of building.</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Id of organization.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "reservations",
            "description": "<p>Array of Room objects.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/roomController.js",
    "groupTitle": "Reservation"
  },
  {
    "type": "post",
    "url": "/rooms",
    "title": "Create Room",
    "name": "CreateRoom",
    "group": "Room",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "room_name",
            "description": "<p>Name of room.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of seats at room.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "is_active",
            "description": "<p>Whether room is active or not.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Building unique ID.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Organization unique ID.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/roomController.js",
    "groupTitle": "Room"
  },
  {
    "type": "delete",
    "url": "/rooms/:room_id",
    "title": "Delete Room",
    "name": "DeleteRoom",
    "group": "Room",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>Room unique ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RoomNotFound",
            "description": "<p>The id of the Room was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/roomController.js",
    "groupTitle": "Room"
  },
  {
    "type": "get",
    "url": "/rooms/search",
    "title": "Get Available Rooms",
    "name": "GetAvailableRooms",
    "group": "Room",
    "parameter": {
      "fields": {
        "Query": [
          {
            "group": "Query",
            "type": "Datetime",
            "optional": false,
            "field": "start",
            "description": "<p>Starttime of search.</p>"
          },
          {
            "group": "Query",
            "type": "Datetime",
            "optional": false,
            "field": "end",
            "description": "<p>Endtime of search.</p>"
          },
          {
            "group": "Query",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>If search is performed on specific building.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "rooms",
            "description": "<p>Available rooms in given query.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/roomController.js",
    "groupTitle": "Room"
  },
  {
    "type": "get",
    "url": "/rooms/:room_id",
    "title": "Get Room",
    "name": "GetRoom",
    "group": "Room",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>Room unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "room_id",
            "description": "<p>Room unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "room_name",
            "description": "<p>Name of room.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of seats at room.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "is_active",
            "description": "<p>Whether room is active or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Building unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Organization unique ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RoomNotFound",
            "description": "<p>The id of the Room was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/roomController.js",
    "groupTitle": "Room"
  },
  {
    "type": "put",
    "url": "/rooms/:room_id",
    "title": "Update Room",
    "name": "UpdateRoom",
    "group": "Room",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "room_name",
            "description": "<p>Name of room.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "size",
            "description": "<p>Number of seats at room.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "is_active",
            "description": "<p>Whether room is active or not.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "building_id",
            "description": "<p>Building unique ID.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "organization_id",
            "description": "<p>Organization unique ID.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "RoomNotFound",
            "description": "<p>The id of the Room was not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/roomController.js",
    "groupTitle": "Room"
  },
  {
    "type": "patch",
    "url": "/disable-two-factor",
    "title": "Disables two factor authentication",
    "name": "DisableTwoFactorAuth",
    "group": "TwoFactor",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Access token</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Two-factor authentication disabled.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/twoFactorController.js",
    "groupTitle": "TwoFactor"
  },
  {
    "type": "patch",
    "url": "/enable-two-factor",
    "title": "Enables two factor authentication",
    "name": "EnableTwoFactorAuth",
    "group": "TwoFactor",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "twoFactorMethod",
            "description": "<p>The two factor method: Email or app</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "verificationToken",
            "description": "<p>Verification token.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide 2FA type: Email or app.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/twoFactorController.js",
    "groupTitle": "TwoFactor"
  },
  {
    "type": "post",
    "url": "/verify",
    "title": "Verifies verification code from email or authenticator application",
    "name": "VerifyVerificationCode",
    "group": "TwoFactor",
    "parameter": {
      "fields": {
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>The verification code</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "refreshToken",
            "description": "<p>Refresh token.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "accessToken",
            "description": "<p>Access token.</p>"
          },
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>The user data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidParameters",
            "description": "<p>Please provide the verification code.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "InvalidVerificationCode",
            "description": "<p>Invalid verification code.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "resources/controllers/twoFactorController.js",
    "groupTitle": "TwoFactor"
  },
  {
    "type": "delete",
    "url": "/users/:user_id",
    "title": "Delete User",
    "name": "DeleteUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "resources/controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:user_id",
    "title": "Get User",
    "name": "GetUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Lastname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Users email address.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "is_active",
            "description": "<p>Whether the user account is active or not.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user_id\": 2,\n  \"first_name\": \"Ivar\",\n  \"last_name\": \"Aasen\",\n  \"email\": \"ivar@aasen.no\",\n  \"is_active\": 1\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "resources/controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get Users",
    "name": "GetUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "users",
            "description": "<p>Array of user objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\": [{...},...]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "resources/controllers/userController.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:user_id",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Users unique ID.</p>"
          }
        ],
        "Body": [
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>Updated firstname.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Updated lastname.</p>"
          },
          {
            "group": "Body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Updated email.</p>"
          },
          {
            "group": "Body",
            "type": "Number",
            "optional": false,
            "field": "is_active",
            "description": "<p>Updated is_active.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>Updated User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"user\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotUpdated",
            "description": "<p>The user was found but not updated.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"User not found\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 304 Not Modified\n{\n  \"error\": \"User found but no changes\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "resources/controllers/userController.js",
    "groupTitle": "User"
  }
] });
