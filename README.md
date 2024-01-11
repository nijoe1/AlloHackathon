# 🚀RocketFunding🚀

### _"RocketFunding: Propelling your projects to success with transparent and efficient funding solutions."_ 🚀

<img src="../AlloHackathon/client/public/RocketFunding.webp"/>

#### Submission project into the Allo on Arbitrum hackathon🧑‍🚀⚛

**Authors:**

- [nijoe1](https://github.com/nijoe1)

## Overview📜

RocketFunding is an innovative decentralized funding platform that revolutionizes the way organizations allocate and distribute grants. By leveraging the strengths of blockchain technology, RocketFunding addresses the inefficiencies and transparency issues prevalent in traditional centralized funding mechanisms. It does that by merging Allo Protocol's Quadratic Funding strategy, Sablier's real-time funding streams, and Hats Protocol. To create a unique and novel Allo strategy.

### Problems in Traditional Grant Committees

Centralized funding mechanisms, particularly in the Web2 domain, often suffer from:

- Lack of transparency in fund allocation.
- Inefficient distribution of resources.
- Reliance on trust-based systems prone to manipulation and bias.
- Slower processing times and higher transaction costs.

### The RocketFunding Solution🔮

RocketFunding introduces a transparent, efficient, and trustless system for fund allocation and distribution. Our platform combines the following key technologies to solve the aforementioned problems:

1. **Allo Protocol:** A protocol for transparent resource allocation, enabling groups to decide on funding allocation efficiently.
2. **Sablier Streaming Protocol:** Facilitates real-time, by-the-second payments, transforming traditional lump-sum transfers into continuous streams, thereby enhancing trust and flexibility in transactions.
3. **Hats Protocol:** Offers a revocable roles system for decentralized work coordination, ensuring modular access control within organizations.
4. **Tableland:** Makes it possible to index all the created profiles and pools information into the RocketFunding platform easily and faster than theGraph. All those with the power of SQLite that tableland supports.

### Flow & Architecture of the Application✨

- **Profile Creation:** Organizations create their profiles with a hierarchical access control system based on the Hats Protocol, where the admin can manage roles within the organization.
- **Funding Pool Creation:** Pools function as impact evaluators, beginning with a registration period where applicants can apply.
- **Review & Acceptance:** During the registration period, reviewers and higher roles can accept or reject applicants, ensuring only desirable projects are selected.
- **Quadratic Voting (QV) Allocation Period:** Managers and admins allocate votes to projects.
- **Fund Distribution:** Post-allocation, the first round of fund distribution begins as a stream, proportionate to votes received and bound by the project's working duration.
- **Project Evaluation & Final Distribution:** After the working period, projects are evaluated for their compliance with proposals. Successful projects receive the final round of funding.

By integrating these technologies, RocketFunding ensures that committee funds are allocated and distributed judiciously, transparently, and efficiently.

## 🧑‍💻Technologies Used 🤖

- **Arbitrum Sepolia 💎:** Ensures transparency, immutability and speed.
- **Allo Protocol 💎:** For efficient resource allocation.
- **Sablier Protocol 💎:** For real-time fund streaming.
- **Hats Protocol 💎:** For decentralized role management and access control.
- **Ethereum Smart Contracts💎:** For secure and automated fund distribution.

---

### Contracts🕸️

- verified contract QVHatsSablierStrategy on Arbiscan.
  https://sepolia.arbiscan.io/address/0x2DA8DD276978BF8Af06314330D14699D326A5C44#code

- verified contract RocketFundingRegistry on Arbiscan.
  https://sepolia.arbiscan.io/address/0x5167ee4Fbb7B04aaA7F5773c96AbFf52C40fb638#code
