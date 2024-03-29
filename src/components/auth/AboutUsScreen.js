import React from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';

export const AboutUsScreen = () => {
    return(
        <div>
            <Grid inverted centered>
                <Grid.Row>
                    <Grid.Column textAlign='justified' width={8}>
                        
                        <Segment color='black' inverted>
                            
                            <Header as='h1' textAlign="center">
                                Conócenos
                            </Header>

                            <Segment color='black' inverted>
                                Domestic dogs inherited complex behaviors, such as bite inhibition, from
                                their wolf ancestors, which would have been pack hunters with complex
                                body language. These sophisticated forms of social cognition and
                                communication may account for their trainability, playfulness, and
                                ability to fit into human households and social situations, and these
                                attributes have given dogs a relationship with humans that has enabled
                                them to become one of the most successful species on the planet today.
                            </Segment>

                            <Segment color='black' inverted>
                                The dogs' value to early human hunter-gatherers led to them quickly
                                becoming ubiquitous across world cultures. Dogs perform many roles for
                                people, such as hunting, herding, pulling loads, protection, assisting
                                police and military, companionship, and, more recently, aiding
                                handicapped individuals. This impact on human society has given them the
                                nickname "man's best friend" in the Western world. In some cultures,
                                however, dogs are also a source of meat.
                            </Segment>

                        </Segment>

                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </div>
    );
}